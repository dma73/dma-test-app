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
          this.filter(criteria, item, filter, filtered);
        });
      }
    } else {
      filtered = items;
    }
    return filtered;
  }
  filter(criteria: string, item: IVocabItem, filter: string, filtered: IVocabItem[]) {
    if (criteria === 'theme') {
      this.applyFilter(filtered, item.theme.toLowerCase(), filter.toLowerCase(), item);
    }
    if (criteria === 'maitrise') {
      this.applyFilter(filtered, item.maitrise, +filter, item);
    }
    if (criteria === 'matiere' ) {
      this.applyFilter(filtered, item.matiereid, +filter, item);
    }
  }
  applyFilter( filtered: IVocabItem[], value, filter, item: IVocabItem) {
    if (value === filter) {
      filtered.push(item);
    }
  }
}
