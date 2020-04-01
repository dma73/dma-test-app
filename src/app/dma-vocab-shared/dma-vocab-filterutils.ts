import { IVocabItem } from './interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DmaVocabFilterutils {
  getFilteredItems(criteria: string, filter: string, items: IVocabItem[]): IVocabItem[] {
    let filtered: IVocabItem[] = new Array<IVocabItem>();
    if (filter !== '') {
      if (items) {
        items.forEach((item) => {
          if (criteria === 'theme' && item.theme === filter) {
            filtered.push(item);
          }
          if (criteria === 'maitrise' && item.maitrise === +filter) {
            filtered.push(item);
          }
          if (criteria === 'matiere' && item.matiereid === +filter) {
            filtered.push(item);
          }
        });
      }
    } else {
      filtered = items;
    }
    return filtered;
  }
}
