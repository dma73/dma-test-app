export class DmaVocabUtils {
  getColor(maitrise: number): string {
    if (maitrise === 0) { return 'darkred'; }
    if (maitrise === 1) { return 'orangered'; }
    if (maitrise === 2) { return 'darkorange'; }
    if (maitrise === 3) { return 'gold'; }
    if (maitrise === 4) { return 'green'; }
  }
}
