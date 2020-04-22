import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Subject, of } from 'rxjs';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IMatiereItem, IRESTfulMatiereItemList, IMatiereItemList } from '../dma-vocab-shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  private activeMatiere: IMatiereItem;
  private subject = new Subject<IMatiereItem>();
  private items: IMatiereItem[] = new Array<IMatiereItem>();

  setMatiere(matiereitem: IMatiereItem[]) {
    if (matiereitem && matiereitem.length) {
      this.subject.next(matiereitem[0]);
      this.activeMatiere = matiereitem[0];
    }
  }

  clearMatiere() {
    this.subject.next();
  }

  getMatiere(): Observable<IMatiereItem> {
    return this.subject.asObservable();
  }
  constructor(private http: HttpClient) { }
  getMatiereItems(): Observable<IMatiereItem[]> {
    let rv: Observable<IMatiereItem[]>;
    console.log('getMatiereItems');
    if (environment.dataCaching && this.items.length > 0) {
      rv = of(this.items);
    } else {
      rv = this.getMatiereItemsFromService();
    }
    return rv;
  }
  getMatiereItemsFromService(): Observable<IMatiereItem[]> {
    console.log('getMatiereItemsFromService');
    return this.http.get<IRESTfulMatiereItemList>(environment.baseurl + '/matiereitems')
      .pipe(
        map(data => {
          // console.log(data);
          const message = data;
          const embedded: IMatiereItemList = message._embedded;
          let items: IMatiereItem[] = new Array<IMatiereItem>();
          if (embedded) {
            items = embedded.matiereItemList as IMatiereItem[];
            this.items = items;
          }
          return items;
        }
        ),
        catchError(
          this.handleError)
      );
  }

  /* public setCurrentMatiere(matiere: IMatiereItem) {
    console.log('setCurrentMatiere previous: ' + this.activeMatiere.intitule + ' new: ' + matiere.intitule);
    this.activeMatiere = matiere;
    this.activeMatiere = matiere;
  } */

  getMatiereItem(id: number): Observable<IMatiereItem> {
    console.log('getMatiereItem');
    return this.getMatiereItems()
      .pipe(
        map(items => {
          console.log(items);
          return this.extractItem(items, id);
        }),
        catchError(this.handleError)
      );
  }
  extractItem(itemList: IMatiereItem[], id: number): IMatiereItem {
    const matiereitem = itemList.filter((item: IMatiereItem) => item.id === id);
    return (matiereitem && matiereitem.length) ? matiereitem[0] : null;
  }

  getItemByIntitule(intitule: string): IMatiereItem {
    let rv: IMatiereItem;
    const filtered = this.items.filter((item) => this.checkIntitule(item, intitule));
    rv = (filtered && filtered.length > 0 ? filtered[0] : undefined);
    return rv;
  }
  checkIntitule(item: IMatiereItem, intitule: string): boolean {
    return item.intitule && intitule && (item.intitule.toLowerCase() === intitule.toLowerCase());
  }

  filterDefault(items: IMatiereItem[]): IMatiereItem[] {
    return items.filter((item: IMatiereItem) => item.defaultmat === true);
  }
  getActiveIntitule(): any {
    return (this.activeMatiere ? this.activeMatiere.intitule : this.activeMatiere);
  }
  getDefaultItem(): Observable<IMatiereItem> {
    console.log('getDefaultItem');
    return this.getMatiereItems()
      .pipe(
        map(items => {
          console.log(items);
          const matiereitem = this.filterDefault(items);
          if (this.activeMatiere === undefined) {
            this.setMatiere(matiereitem);
          }
          return this.activeMatiere;
        }),
        catchError(this.handleError)
      );
  }
  getCurrentOrDefaultItem(): Observable<IMatiereItem> {
    console.log('getCurrentOrDefaultItem');
    if (this.activeMatiere) {
      return of(this.activeMatiere);
    } else {
      return this.getDefaultItem();
    }
  }


  saveMatiereItem(id: number, item: IMatiereItem): Observable<IMatiereItem> {
    return this.http.put<IMatiereItem>(environment.baseurl + '/matiereitems' + '/' + id, item)
      .pipe(
        map((saveditem) => {
          this.updateCache(saveditem);
          if (item.defaultmat) {
            this.changeDefault(item);
          }
          return saveditem;
        })
      );
  }

  changeDefault(newDefaultItem: IMatiereItem) {
    this.items.forEach((item) => {
      if (item.id !== newDefaultItem.id && item.defaultmat) {
        item.defaultmat = false;
        this.saveMatiereItem(item.id, item).subscribe();
      }
    });
  }

  getFirstItem(wrapper: IRESTfulMatiereItemList): IMatiereItem {
    let rv: IMatiereItem;
    try {
      rv = wrapper._embedded.matiereItemList[0];
    } catch {
    }
    return rv;
  }

  updateCache(matiere: IMatiereItem) {
    if (matiere.id) {
      const index = this.items.findIndex((item) => item.id === matiere.id);
      console.log(matiere.intitule, matiere.id, index);
      if (index >= 0) {
        this.items[index] = matiere;
      } else {
        this.items.push(matiere);
      }
      // Force refresh
      const temp: Array<IMatiereItem> = new Array<IMatiereItem>();
      temp.push(this.activeMatiere);
      this.setMatiere(temp);
    }
  }
  deleteCache(id: number) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }
  deleteMatiereItem(id: number): Observable<IMatiereItem> {
    return this.http.delete<IMatiereItem>(environment.baseurl + '/matiereitems' + '/' + id)
      .pipe(
        map((saveditem) => {
          this.deleteCache(id);
          return saveditem;
        }));
  }
  private handleError(error: any) {
    let errMessage = error || 'Node.js server error';
    console.error('server error:', error);
    if ((error.error instanceof Error)) {
      errMessage = error.error.message;
    }
    return throwError(errMessage);
  }
}
