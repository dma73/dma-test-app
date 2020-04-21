import { Component, OnInit, OnDestroy } from '@angular/core';
import { IVocabItem, IMatiereItem } from '../dma-vocab-shared/interfaces';
import { DataService } from '../dma-vocab-core/data.service';
import { faGraduationCap, faPlus, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { DmaVocabUtils } from '../dma-vocab-shared/dma-vocab-utils';
import { DmaVocabFilterutils } from '../dma-vocab-shared/dma-vocab-filterutils';
import { MatiereService } from '../dma-vocab-core/matiere.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { CapitalizeFirstPipe } from '../dma-vocab-shared/capitalizefirst.pipe';

@Component({
  selector: 'app-dma-vocab-lesson',
  templateUrl: './dma-vocab-lesson.component.html',
  styleUrls: ['./dma-vocab-lesson.component.css']
})
export class DmaVocabLessonComponent implements OnInit, OnDestroy {
  lessons: Set<string> = new Set<string>();
  faGraduationCap = faGraduationCap;
  faPlus = faPlus;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  words: IVocabItem[];
  current = '';
  currentLesson: IVocabItem[] = new Array<IVocabItem>();
  utils: DmaVocabUtils = new DmaVocabUtils();
  matiereItem: IMatiereItem;
  subscription: Subscription;
  theme: string = undefined;

  constructor(private dataService: DataService,
              private filterUtils: DmaVocabFilterutils,
              private matiereService: MatiereService,
              private route: ActivatedRoute) {
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
    this.theme = this.route.snapshot.paramMap.get('theme');
    this.matiereService.getCurrentOrDefaultItem()
      .subscribe((matiereItem: IMatiereItem) =>
        this.loadData(matiereItem));

  }
  loadData(matiereItem: IMatiereItem) {
    console.log('loadData: ' + matiereItem);
    this.matiereItem = matiereItem;
    this.dataService.getVocabItems().subscribe((vocabItems: IVocabItem[]) => {
      this.words = this.filterUtils.getFilteredItems(
        'matiere',
        '' + this.matiereItem.id,
        vocabItems
      );
      this.buildList();
    });

  }
  buildList() {
    this.lessons.clear();
    this.words.forEach((vocabitem: IVocabItem) => {
      if (this.theme) {
        this.current = CapitalizeFirstPipe.toFirstCap(this.theme);
        this.refresh();
      } else if (this.lessons.size === 0) {
        this.current = CapitalizeFirstPipe.toFirstCap(vocabitem.theme);
        this.refresh();
      }
      this.lessons.add(CapitalizeFirstPipe.toFirstCap(vocabitem.theme));
    });
    this.lessons = this.sortSet(this.lessons);
  }
  sortSet(set: Set<string>): Set<string> {
    const sorted = new Set<string>();
    const temp: Array<string> = Array.from(set);
    temp.sort();
    temp.forEach((s) => sorted.add(s));
    return sorted;
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
