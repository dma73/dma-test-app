import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IVocabItem, IMatiereItem } from '../dma-vocab-shared/interfaces';
import { DmaVocabUtils } from '../dma-vocab-shared/dma-vocab-utils';
import { DataService } from '../dma-vocab-core/data.service';
import { DmaVocabFilterutils } from '../dma-vocab-shared/dma-vocab-filterutils';
import { MatiereService } from '../dma-vocab-core/matiere.service';

@Component({
  selector: 'app-dma-vocab-test',
  templateUrl: './dma-vocab-test.component.html',
  styleUrls: ['./dma-vocab-test.component.css']
})
export class DmaVocabTestComponent implements OnInit {
  testItems: IVocabItem[];
  utils: DmaVocabUtils = new DmaVocabUtils();
  testSize = 0;
  sens = false;
  testItem: IVocabItem;
  savedItem: IVocabItem;
  errorCount = 0;
  header = '';
  question = '';
  labelreponse = '';
  reponse = '';
  feedback = '';
  buttontext = '';
  theme = '';
  error = false;
  matiere: IMatiereItem;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
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
        console.log('createTest initial value: ' + (this.matiere ? this.matiere.intitule : this.matiere));
        this.dataService.getVocabItems().subscribe((vocabItems: IVocabItem[]) => {
          let items: IVocabItem[] = new Array<IVocabItem>();

          items = this.filterUtils.getFilteredItems('theme', this.theme,
            this.filterUtils.getFilteredItems(
              'matiere',
              '' + matiere.id,
              vocabItems
            )
          );
          this.testItems = new Array<IVocabItem>();
          this.addTestItemsPerMaitrise(1, 4, items);
          this.addTestItemsPerMaitrise(3, 3, items);
          this.addTestItemsPerMaitrise(6, 2, items);
          this.addTestItemsPerMaitrise(10, 1, items);
          this.addTestItemsPerMaitrise(20, 0, items);
          this.testSize = this.testItems.length;
          this.showQuestion();
        });
      });
  }
  private randomInt(max: number): number {
    const rv: number = Math.floor(Math.random() * (max));
    console.log('random(' + max + ') = ' + rv);
    return rv;
  }
  private randomBoolean(): boolean {
    let rv = false;
    const rnd = this.randomInt(2);
    if (rnd > 0) {
      rv = true;
    }
    // console.log('' + rnd + ' , ' + rv);
    return rv;
  }
  private addTestItemsPerMaitrise(count: number, maitrise: number, vocabItems: IVocabItem[]) {
    const filtered: IVocabItem[] = this.filterUtils.getFilteredItems('maitrise', '' + maitrise, vocabItems);
    if (filtered.length > 0) {
      while (this.testItems.length < count && filtered.length > 0) {
        const rand: number = this.randomInt(filtered.length);
        this.testItems.push(filtered[rand]);
        filtered.splice(rand, 1);
      }
    }
  }
  private showQuestion() {
    if (this.testItems.length > 0) {

      this.testItem = this.testItems[0];
      if (this.testItem.bidirectionnel) {
        this.sens = this.randomBoolean();
      } else {
        this.sens = true;
      }

      this.header = this.matiere.intitule + ' - Evaluation : Question ' + (this.testSize + 1 - this.testItems.length)
        + ' de ' + this.testSize + ' -      Thème : ' + this.testItem.theme;
      this.reponse = '';
      this.feedback = '';
      this.buttontext = 'Valider';
      let contexte = '';
      if (this.testItem.contexte != null && this.testItem.contexte.length > 0) {
        contexte = ' ( ' + this.testItem.contexte + ' ) ';
      }
      if (this.sens) {

        this.question = this.matiere.questionlabel + ': ' + this.testItem.question + contexte;
        this.labelreponse = this.matiere.reponselabel + ': ';
      } else {
        this.question = this.matiere.reponselabel + ': ' + this.testItem.reponse + contexte;
        this.labelreponse = this.matiere.questionlabel + ': ';
      }
    } else {
      this.feedback = 'Le test est terminé, vous avez ' + (this.testSize - this.errorCount) + '/' + this.testSize;
      this.buttontext = 'Nouveau Test...';
    }
  }
  checkAnswer() {
    if (this.testItems.length === 0) {
      this.createTest();
    } else {
      if (!this.error) {
        if (!this.teste()) {
          this.feedback = 'Réponse correcte - ' + this.matiere.questionlabel + ': <'
            + this.testItem.question + '> Mot ' + this.matiere.reponselabel + ': <' + this.testItem.reponse + '>';
          this.error = true;
          this.errorCount++;
          this.buttontext = 'Suivant';
        } else {
          this.feedback = '';
          this.error = false;
          this.showQuestion();
        }
      } else {
        this.feedback = '';
        this.error = false;
        this.showQuestion();
      }
    }
  }

  teste(): boolean {
    let reponse = '';
    let rv = false;
    if (this.sens) {
      reponse = this.testItem.reponse;
    } else {
      reponse = this.testItem.question;
    }
    // console.log(this.reponse + ' , ' + reponse + ' , ' + this.sens);
    if (this.check(reponse, this.reponse)) {
      this.utils.correct(this.testItem);
      rv = true;
    } else {
      this.utils.incorrect(this.testItem);
    }
    this.dataService.saveVocabItem(+(this.testItem).id, this.testItem).subscribe(
      (vocabItem: IVocabItem) => {
        this.savedItem = vocabItem;
      });
    this.testItems.splice(0, 1);
    return rv;

  }

  check(expected: string, given: string): boolean {
    let found = false;
    found = expected.split('|').some((value) => {
      if (value.trim().toUpperCase() === given.trim().toUpperCase()) {
        return true;
      }
    });
    return found;
  }
}
