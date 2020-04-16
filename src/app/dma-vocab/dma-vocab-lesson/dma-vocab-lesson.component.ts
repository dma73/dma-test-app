import { Component, OnInit, OnDestroy } from '@angular/core';
import { IVocabItem, IMatiereItem } from '../dma-vocab-shared/interfaces';
import { DataService } from '../dma-vocab-core/data.service';
import { faGraduationCap, faPlus } from '@fortawesome/free-solid-svg-icons';
import { DmaVocabUtils } from '../dma-vocab-shared/dma-vocab-utils';
import { DmaVocabFilterutils } from '../dma-vocab-shared/dma-vocab-filterutils';
import { MatiereService } from '../dma-vocab-core/matiere.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-dma-vocab-lesson',
  templateUrl: './dma-vocab-lesson.component.html',
  styleUrls: ['./dma-vocab-lesson.component.css']
})
export class DmaVocabLessonComponent implements OnInit, OnDestroy {
  lessons: Set<string> = new Set<string>();
  faGraduationCap = faGraduationCap;
  faPlus = faPlus;
  words: IVocabItem[];
  current = '';
  currentLesson: IVocabItem[] = new Array<IVocabItem>();
  utils: DmaVocabUtils = new DmaVocabUtils();
  matiereItem: IMatiereItem;
  subscription: Subscription;

  constructor(private dataService: DataService,
              private filterUtils: DmaVocabFilterutils,
              private matiereService: MatiereService) {
    this.subscription = this.matiereService.getMatiere()
    .subscribe(matiere => {
      if (matiere) {
        this.matiereItem = matiere;
        this.loadData(matiere);
      }
    });
  }

  ngOnInit() {
    console.log('ngOnInit()');
    this.matiereService.getCurrentOrDefaultItem()
      .subscribe((matiereItem: IMatiereItem) =>
        this.loadData(matiereItem));

  }
  loadData(matiereItem: IMatiereItem) {
    console.log('loadData: ' + matiereItem );
    this.matiereItem = matiereItem;
    this.dataService.getVocabItems().subscribe((vocabItems: IVocabItem[]) => {
      this.words = this.filterUtils.getFilteredItems(
        'matiere',
        '' + this.matiereItem.id,
        vocabItems
      );
      this.lessons.clear();
      this.words.forEach((vocabitem: IVocabItem) => {
        if (this.lessons.size === 0) {
          this.current = vocabitem.theme;
          this.refresh();
        }
        this.lessons.add(vocabitem.theme);
      });
    });

  }
  refresh() {
    if (this.current !== '') {
      this.currentLesson = this.filterUtils.getFilteredItems('theme', this.current, this.words);
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
