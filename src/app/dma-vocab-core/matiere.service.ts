import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IMatiereItem, IRESTfulMatiereItemList, IMatiereItemList } from '../dma-vocab-shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  private static activeMatiere: IMatiereItem;
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

public setCurrentMatiere(matiere: IMatiereItem) {
  MatiereService.activeMatiere = matiere;
}

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
        if (MatiereService.activeMatiere === undefined) {
          if (matiereitem && matiereitem.length) {
            MatiereService.activeMatiere = matiereitem[0];
          }
        }
        return MatiereService.activeMatiere;
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
