import { IVocabItem, ITabularItem, IDataItem, IMatiereItem } from './interfaces';
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
  correct(item: ITabularItem) {
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
  incorrect(item: ITabularItem) {
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
  vocabToTabular(input: IVocabItem): ITabularItem {
    const rv = {} as ITabularItem;
    rv.id = input.id;
    rv.question = input.question;
    try {
      const obj = JSON.parse(input.reponse);
      rv.reponse = obj as Array<string>;
    } catch {
      rv.reponse = [input.question, input.reponse];
    }
    rv.bidirectionnel = input.bidirectionnel;
    rv.contexte = input.contexte;
    rv.theme = input.theme;
    rv.maitrise = input.maitrise;
    rv.niveau = input.niveau;
    rv.matiereid = input.matiereid;
    return rv;
  }
  tabularToVocab(input: ITabularItem): IVocabItem {
    const rv = {} as IVocabItem;
    rv.id = input.id;
    rv.question = input.question;
    const str = JSON.stringify(input.reponse);
    rv.reponse = str;
    rv.bidirectionnel = input.bidirectionnel;
    rv.contexte = input.contexte;
    rv.theme = input.theme;
    rv.maitrise = input.maitrise;
    rv.niveau = input.niveau;
    rv.matiereid = input.matiereid;
    return rv;
  }
  isTabular(item: IDataItem): boolean {
    let rv = false;
    if (item.question === this.getTabular()) {
      rv = true;
    }
    return rv;
  }
  isTabularM(item: IMatiereItem): boolean {
    let rv = false;
    if (item.questionlabel === this.getTabular()) {
      rv = true;
    }
    return rv;
  }
  getTabular(): string {
    return '{type:"tabular"}';
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
