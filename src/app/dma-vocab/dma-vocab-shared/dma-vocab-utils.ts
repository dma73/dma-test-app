import { IVocabItem, IDataItem, IMatiereItem } from './interfaces';
import { IconDefinition, faExchangeAlt, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DmaVocabUtils {
  colorsByNumbers: { [id: number]: string; } = {
    0: 'darkred',
    1: 'orangered',
    2: 'darkorange',
    3: 'gold',
    4: 'green'};
  getColor(maitrise: number): string {
    let color = '';
    if (maitrise >= 0 && maitrise <= 4) {
      color = this.colorsByNumbers[maitrise];
    }
    return color;
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
  getIcon(bidirectionnel: boolean): IconDefinition {
    let icon: IconDefinition = faExchangeAlt;
    if (!bidirectionnel) {
      icon = faLongArrowAltRight;
    }
    return icon;
  }
  initHeaders(matiere: IMatiereItem): Array<string> {
    let rv: Array<string>;
    try {
      const obj = JSON.parse(matiere.reponselabel);
      rv = obj as Array<string>;
    } catch {
      rv = [matiere.questionlabel, matiere.reponselabel];
    }
    return rv;
  }
  newStringArray(size: number): Array<string> {
    const rv = new Array<string>(size);
    rv.forEach((s) => s = '');
    return rv;
  }
}
