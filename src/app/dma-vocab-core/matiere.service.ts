import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IMatiereItem, IRESTfulMatiereItemList, IMatiereItemList } from '../dma-vocab-shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  private activeMatiere: IMatiereItem;
  private subject = new Subject<IMatiereItem>();

  setMatiere(matiere: IMatiereItem) {
    this.subject.next(matiere);
    this.activeMatiere = matiere;
  }

  clearMatiere() {
    this.subject.next();
  }

  getMatiere(): Observable<IMatiereItem> {
    return this.subject.asObservable();
  }
constructor(private http: HttpClient) { }
getMatiereItems(): Observable<IMatiereItem[]> {
  return this.http.get<IRESTfulMatiereItemList>('http://dmathys.com:8081/matiereitems')
  .pipe(
    map(data => {
        const message = data;
        const embedded: IMatiereItemList = message._embedded;
        const items: IMatiereItem[] = embedded.matiereItemList as IMatiereItem[];
        return items;
      }
    ),
    catchError(this.handleError)
  );
}

/* public setCurrentMatiere(matiere: IMatiereItem) {
  console.log('setCurrentMatiere previous: ' + this.activeMatiere.intitule + ' new: ' + matiere.intitule);
  this.activeMatiere = matiere;
  this.activeMatiere = matiere;
} */

getMatiereItem(id: number): Observable<IMatiereItem> {
  return this.http.get<IRESTfulMatiereItemList>('http://dmathys.com:8081/matiereitems')
    .pipe(
      map(data => {
        const matiereitems = data._embedded.matiereItemList;
        const matiereitem = matiereitems.filter((item: IMatiereItem) => item.id === id);
        return (matiereitem && matiereitem.length) ? matiereitem[0] : null;
      }),
      catchError(this.handleError)
    );
}
getCurrentOrDefaultItem(): Observable<IMatiereItem> {
  return this.http.get<IRESTfulMatiereItemList>('http://dmathys.com:8081/matiereitems')
    .pipe(
      map(data => {
        const matiereitems = data._embedded.matiereItemList;
        const matiereitem = matiereitems.filter((item: IMatiereItem) => item.defaultmat === true);
        console.log('getCurrentOrDefaultItem initial value: ' + (this.activeMatiere ? this.activeMatiere.intitule : this.activeMatiere));
        if (this.activeMatiere === undefined) {

          if (matiereitem && matiereitem.length) {
            this.setMatiere( matiereitem[0]);
          }
        }
        console.log('getCurrentOrDefaultItem final value: ' + (this.activeMatiere ? this.activeMatiere.intitule : this.activeMatiere));
        return this.activeMatiere;
      }),
      catchError(this.handleError)
    );
}


saveMatiereItem(id: number, item: IMatiereItem): Observable<IMatiereItem> {
  return this.http.put<IMatiereItem>('http://dmathys.com:8081/matiereitems' + '/' + id, item);
}
deleteMatiereItem(id: number): Observable<IMatiereItem> {
  return this.http.delete<IMatiereItem>('http://dmathys.com:8081/matiereitems' + '/' + id);
}
private handleError(error: any) {
  console.error('server error:', error);
  if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
  }
  return throwError(error || 'Node.js server error');
}
}
