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
  console.log('getMatiereItems');
  return this.http.get<IRESTfulMatiereItemList>(environment.baseurl + '/matiereitems')
  .pipe(
    map(data => {
        // console.log(data);
        const message = data;
        const embedded: IMatiereItemList = message._embedded;
        const items: IMatiereItem[] = embedded.matiereItemList as IMatiereItem[];
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
  return this.http.get<IRESTfulMatiereItemList>(environment.baseurl + '/matiereitems')
    .pipe(
      map(data => {
        console.log(data);
        return this.extractItem(data, id);
      }),
      catchError(this.handleError)
    );
}
extractItem(itemList: IRESTfulMatiereItemList, id: number): IMatiereItem {
  const matiereitems = itemList._embedded.matiereItemList;
  const matiereitem = matiereitems.filter((item: IMatiereItem) => item.id === id);
  return (matiereitem && matiereitem.length) ? matiereitem[0] : null;
}

filterDefault(items: IMatiereItem[]): IMatiereItem[] {
  return items.filter((item: IMatiereItem) => item.defaultmat === true);
}
getActiveIntitule(): any {
  return (this.activeMatiere ? this.activeMatiere.intitule : this.activeMatiere);
}
getDefaultItem(): Observable<IMatiereItem> {
  console.log('getDefaultItem');
  return this.http.get<IRESTfulMatiereItemList>(environment.baseurl + '/matiereitems')
    .pipe(
      map(data => {
        console.log(data);
        const matiereitem = this.filterDefault(data._embedded.matiereItemList);
        // console.log('getCurrentOrDefaultItem initial value: ' + this.getActiveIntitule());
        if (this.activeMatiere === undefined) {
          this.setMatiere( matiereitem );
        }
        // console.log('getCurrentOrDefaultItem final value: ' + this.getActiveIntitule());
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
  return this.http.put<IMatiereItem>(environment.baseurl + '/matiereitems' + '/' + id, item);
}
deleteMatiereItem(id: number): Observable<IMatiereItem> {
  return this.http.delete<IMatiereItem>(environment.baseurl + '/matiereitems' + '/' + id);
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
