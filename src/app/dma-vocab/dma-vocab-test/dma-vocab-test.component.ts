import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IVocabItem, IMatiereItem, ITabularItem } from '../dma-vocab-shared/interfaces';
import { DmaVocabUtils } from '../dma-vocab-shared/dma-vocab-utils';
import { VocabService } from '../dma-vocab-core/vocab.service';
import { DmaVocabFilterutils } from '../dma-vocab-shared/dma-vocab-filterutils';
import { MatiereService } from '../dma-vocab-core/matiere.service';

@Component({
  selector: 'app-dma-vocab-test',
  templateUrl: './dma-vocab-test.component.html',
  styleUrls: ['./dma-vocab-test.component.css']
})
export class DmaVocabTestComponent implements OnInit {
  testItems: ITabularItem[];
  utils: DmaVocabUtils = new DmaVocabUtils();
  testSize = 0;
  sens = false;
  testItem: ITabularItem;
  savedItem: IVocabItem;
  enonces: string[];
  solutions: string[];
  reponses: string[];
  labels: string[];
  labelsquestions: string[];
  errorCount = 0;
  header = '';
  question = '';
  labelreponse = '';
  reponse = '';
  feedback = new Array<string>();
  buttontext = '';
  theme = '';
  error = false;
  matiere: IMatiereItem;
  indexes: Array<number>;
  questionCount = 0;
  headers: Array<string>;

  constructor(private vocabService: VocabService,
              private route: ActivatedRoute,
              private filterUtils: DmaVocabFilterutils,
              private matiereService: MatiereService) { }

  ngOnInit() {
    this.theme = this.route.snapshot.paramMap.get('theme');
    this.createTest();
  }
  createTest() {
    this.matiereService
      .getCurrentOrDefaultItem()
      .subscribe((matiere: IMatiereItem) => {
        this.matiere = matiere;
        this.headers = this.utils.initHeaders(matiere);
        console.log('createTest initial value: ' + (this.matiere ? this.matiere.intitule : this.matiere));
        this.vocabService.getVocabItems().subscribe((vocabItems: IVocabItem[]) => {
          let items: IVocabItem[] = new Array<IVocabItem>();

          items = this.filterUtils.getFilteredItems('theme', this.theme,
            this.filterUtils.getFilteredItems(
              'matiere',
              '' + matiere.id,
              vocabItems
            )
          );
          this.addTestItems(items);
          this.showQuestion();
        });
      });
  }
  private addTestItems(items: IVocabItem[]) {
    this.testItems = new Array<ITabularItem>();
    this.addTestItemsPerMaitrise(1, 4, items);
    this.addTestItemsPerMaitrise(3, 3, items);
    this.addTestItemsPerMaitrise(6, 2, items);
    this.addTestItemsPerMaitrise(10, 1, items);
    this.addTestItemsPerMaitrise(20, 0, items);
    this.testSize = this.testItems.length;
  }

  private randomInt(max: number, min: number): number {
    const rv: number = min + Math.floor(Math.random() * (max - min));
    console.log('random(', max, ' , ', min,  ') = ' + rv);
    return rv;
  }
  private addTestItemsPerMaitrise(count: number, maitrise: number, vocabItems: IVocabItem[]) {
    const filtered: IVocabItem[] = this.filterUtils.getFilteredItems('maitrise', '' + maitrise, vocabItems);
    if (filtered.length > 0) {
      while (this.testItems.length < count && filtered.length > 0) {
        const rand: number = this.randomInt(filtered.length, 0);
        this.testItems.push(this.utils.vocabToTabular(filtered[rand]));
        filtered.splice(rand, 1);
      }
    }
  }
  initRandom() {
    const size = this.testItem.reponse.length;
    this.reset();
    console.log(size);
    if (this.testItem.bidirectionnel) {
      this.indexes = this.getShuffledArray(size);
      this.questionCount = this.randomInt(this.indexes.length - 1, 1);
    } else {
      this.indexes = this.getArray(size);
      this.questionCount = 1;
    }
    for (let i = 0; i < this.questionCount; i++) {
      this.enonces.push(this.testItem.reponse[this.indexes[i]]);
      this.labelsquestions.push(this.headers[this.indexes[i]]);
    }
    for (let i = this.questionCount; i < size; i++) {
      this.solutions.push(this.testItem.reponse[this.indexes[i]]);
      this.reponses.push('');
      this.labels.push(this.headers[this.indexes[i]]);
    }
  }

  shuffle<T>(array: Array<T>): Array<T> {
    let currentIndex = array.length;
    let temporaryValue: T;
    let randomIndex: number;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  getShuffledArray(size: number): Array<number> {
    let array = this.getArray(size);
    array = this.shuffle<number>(array);
    return array;
  }

  getArray(size: number): Array<number> {
    const array = new Array<number>(size);
    for (let index = 0; index < size; index ++){
      array[index] = index;
    }
    return array;
  }

  reset() {
    this.enonces = new Array<string>();
    this.solutions = new Array<string>();
    this.reponses = new Array<string>();
    this.labels = new Array<string>();
    this.labelsquestions = new Array<string>();
  }
  private showQuestion() {
    if (this.testItems.length > 0) {
      this.testItem = this.testItems[0];
      this.initRandom();

      this.header = this.matiere.intitule + ' - Evaluation : Question ' + (this.testSize + 1 - this.testItems.length)
        + ' de ' + this.testSize + ' -      Thème : ' + this.testItem.theme;
      this.reponse = '';
      this.feedback = new Array<string>();
      this.buttontext = 'Valider';
    } else {
      this.feedback = ['Le test est terminé, vous avez ' + (this.testSize - this.errorCount) + '/' + this.testSize];
      this.buttontext = 'Nouveau Test...';
    }
  }
  getContexte(): string {
    let contexte = '';
    if (this.testItem.contexte != null && this.testItem.contexte.length > 0) {
      contexte = ' ( ' + this.testItem.contexte + ' ) ';
    }
    return contexte;
  }
  process() {
    if (!this.error) {
      if (this.testItems.length === 0) {
        // Test is finished, create a new one
        this.createTest();
      } else {
        // Check answer and show next question if correct or error feedback if incorrect
        this.processAfterSuccess();
      }
    } else {
      // Next question after error feedback
      this.processAfterError();
  }
  }

  private processAfterError() {
    this.feedback = new Array<string>();
    this.error = false;
    this.showQuestion();
  }

  private processAfterSuccess() {
    if (!this.verifyAndUpdate()) {
      this.feedback = new Array<string>();
      this.feedback.push('Réponse correcte: ');
      this.headers.forEach((s, i) => {
        this.feedback.push(' ' + s + ': ' + this.testItem.reponse[i]);
      });
      this.error = true;
      this.errorCount++;
      this.buttontext = 'Suivant';
    } else {
      this.feedback = new Array<string>();
      this.error = false;
      this.showQuestion();
    }
  }
  verifyAndUpdate(): boolean {
    let rv = false;
    // console.log(this.reponse + ' , ' + reponse + ' , ' + this.sens);
    if (this.checkAnswers()) {
      this.utils.correct(this.testItem);
      rv = true;
    } else {
      this.utils.incorrect(this.testItem);
    }
    this.vocabService.saveVocabItem(+(this.testItem).id, this.utils.tabularToVocab(this.testItem)).subscribe(
      (vocabItem: IVocabItem) => {
        this.savedItem = vocabItem;
      });
    this.testItems.splice(0, 1);
    return rv;

  }

  compare(expected: string, given: string): boolean {
    let found = false;
    found = expected.split('|').some((value) => {
      if (value.trim().toUpperCase() === given.trim().toUpperCase()) {
        return true;
      }
    });
    return found;
  }
  checkAnswers() {
    let rv = true;
    this.solutions.forEach((v, i) => {
      if (!this.compare(v, this.reponses[i])) {
        rv = false;
      }
    });
    return rv;

  }
}
