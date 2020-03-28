import { IVocabItem } from './interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DmaVocabFilterutils {
  getWords(criteria: string, filter: string, words: IVocabItem[]): IVocabItem[] {
    let lecon: IVocabItem[] = new Array<IVocabItem>();
    if (filter !== '') {
      if (words) {
        words.forEach((word) => {
          if (criteria === 'theme' && word.theme === filter) {
            lecon.push(word);
          }
          if (criteria === 'maitrise' && word.maitrise === +filter) {
            lecon.push(word);
          }
        });
      }
    } else {
      lecon = words;
    }
    return lecon;
  }
}
