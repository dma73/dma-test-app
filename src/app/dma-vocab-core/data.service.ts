import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IVocabItem, IRESTfulVocabItemList, IVocabItemList } from '../../app/dma-vocab-shared/interfaces';
import { IMatiereItem, IRESTfulMatiereItemList, IMatiereItemList } from '../../app/dma-vocab-shared/interfaces';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    baseUrl = 'assets/';

    constructor(private http: HttpClient) { }

    getVocabItemsLocal(): Observable<IVocabItem[]> {
      return this.http.get<IVocabItem[]>('assets/vocab.json')
      .pipe(
        map(data => {
            return data as IVocabItem[];
          }
        ),
        catchError(this.handleError)
      );
    }
    getVocabItems(): Observable<IVocabItem[]> {
      return this.http.get<IRESTfulVocabItemList>('http://dmathys.com:8081/vocabitems')
      .pipe(
        map(data => {
            const message = data;
            const embedded: IVocabItemList = message._embedded;
            const items: IVocabItem[] = embedded.vocabItemList as IVocabItem[];
            return items;
          }
        ),
        catchError(this.handleError)
      );
    }

    getVocabItem(id: number): Observable<IVocabItem> {
      return this.http.get<IRESTfulVocabItemList>('http://dmathys.com:8081/vocabitems')
        .pipe(
          map(data => {
            const vocabitems = data._embedded.vocabItemList;
            const vocabitem = vocabitems.filter((item: IVocabItem) => item.id === id);
            return (vocabitem && vocabitem.length) ? vocabitem[0] : null;
          }),
          catchError(this.handleError)
        );
    }

    saveVocabItem(id: number, item: IVocabItem): Observable<IVocabItem> {
      return this.http.put<IVocabItem>('http://dmathys.com:8081/vocabitems' + '/' + id, item);
    }
    deleteVocabItem(id: number): Observable<IVocabItem> {
      return this.http.delete<IVocabItem>('http://dmathys.com:8081/vocabitems' + '/' + id);
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
