import { IVocabItem } from './interfaces';

export class DmaVocabUtils {
  getColor(maitrise: number): string {
    if (maitrise === 0) { return 'darkred'; }
    if (maitrise === 1) { return 'orangered'; }
    if (maitrise === 2) { return 'darkorange'; }
    if (maitrise === 3) { return 'gold'; }
    if (maitrise === 4) { return 'green'; }
  }
  correct(item: IVocabItem) {
    if (item.maitrise < 2) {
      item.maitrise++;
      item.niveau = 0;
    } else {
      if (item.maitrise < 4) {
        item.niveau++;
        if (item.niveau === 2) {
          item.niveau = 0;
          item.maitrise++;
        }
      }
    }
  }
  incorrect(item: IVocabItem) {
    if (item.maitrise > 0) {
      item.maitrise--;
      item.niveau = 0;
    }
  }
}
