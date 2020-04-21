import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IVocabItem, IRESTfulVocabItemList, IVocabItemList } from '../dma-vocab-shared/interfaces';
import { environment } from 'src/environments/environment';

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
      // console.log('getVocabItems()');
      return this.http.get<IRESTfulVocabItemList>(environment.baseurl + '/vocabitems')
      .pipe(
        map(data => {
            // console.log(data);
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
      return this.http.get<IRESTfulVocabItemList>(environment.baseurl + '/vocabitems')
      // return this.http.get<any>(environment.baseurl + '/vocabitems')
        .pipe(
          map(data => {
            console.log(data);
            const vocabitems = data._embedded.vocabItemList;
            const filtered = vocabitems.filter((item: IVocabItem) => item.id === id);
            return this.getFirst<IVocabItem>(filtered);
          }),
          catchError(this.handleError)
        );
    }

    getFirst<T>( arr: Array<T>): T {
      return (arr && arr.length) ? arr[0] : null;
    }

    saveVocabItem(id: number, item: IVocabItem): Observable<IVocabItem> {
      return this.http.put<IVocabItem>(environment.baseurl + '/vocabitems' + '/' + id, item);
    }
    deleteVocabItem(id: number): Observable<IVocabItem> {
      return this.http.delete<IVocabItem>(environment.baseurl + '/vocabitems' + '/' + id);
    }

    private handleError(error: any) {
      let rv = error;
      console.error('server error:', error);
      if (error.error instanceof Error) {
          rv = error.error.message;
          // Use the following instead if using lite-server
          // return Observable.throw(err.text() || 'backend server error');
      }
      return throwError(rv || 'Node.js server error');
    }
}
