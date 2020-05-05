import { Component, OnInit, OnDestroy } from '@angular/core';
import { IVocabItem, IMatiereItem } from '../dma-vocab-shared/interfaces';
import { VocabService } from '../dma-vocab-core/vocab.service';
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
  headers: string[];

  constructor(private vocabService: VocabService,
              private filterUtils: DmaVocabFilterutils,
              private matiereService: MatiereService,
              private route: ActivatedRoute) {
    this.subscription = this.matiereService.getMatiere()
      .subscribe(matiere => {
        if (matiere) {
          this.theme = '';
          this.matiereItem = matiere;
          this.loadHeaders(matiere);
          this.loadData(matiere);
        }
      });
  }

  ngOnInit() {
    console.log('ngOnInit()');
    this.theme = this.route.snapshot.paramMap.get('theme');
    this.matiereService.getCurrentOrDefaultItem()
      .subscribe((matiereItem: IMatiereItem) => {
        this.loadHeaders(matiereItem);
        this.loadData(matiereItem);
      });
  }
  loadHeaders(matiere: IMatiereItem) {
    this.headers = this.utils.initHeaders(matiere);

  }
  loadData(matiereItem: IMatiereItem) {
    console.log('loadData: ', matiereItem.intitule);
    this.matiereItem = matiereItem;
    this.vocabService.getVocabItems().subscribe((vocabItems: IVocabItem[]) => {
      this.words = this.filterUtils.getFilteredItems(
        'matiere',
        '' + this.matiereItem.id,
        vocabItems
      );
      this.buildList();
    });

  }

  setCurrent(vocabitem: IVocabItem) {
    if (this.notempty(this.theme)) {
      console.log('setCurrent not empty:', this.theme);
      this.current = CapitalizeFirstPipe.toFirstCap(this.theme);
      this.refresh();
    } else if (this.lessons.size === 0) {
      const theme = (this.matiereService.getLastTheme() ? this.matiereService.getLastTheme() : vocabitem.theme);
      console.log('setCurrent empty:', vocabitem.theme, this.matiereService.getLastTheme());
      this.current = CapitalizeFirstPipe.toFirstCap(theme);
      this.refresh();
    }
    this.matiereService.setLastTheme(this.current);
  }
  buildList() {
    this.lessons.clear();
    this.words.forEach((vocabitem: IVocabItem) => {
      this.setCurrent(vocabitem);
      this.lessons.add(CapitalizeFirstPipe.toFirstCap(vocabitem.theme));
    });
    this.lessons = this.sortSet(this.lessons);
  }
  notempty(s: string): boolean {
    return (s && s.trim().length > 0);
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
      this.currentLesson = new Array<IVocabItem>();
      this.filterUtils.getFilteredItems('theme', this.current, this.words).forEach((item) => {
        this.currentLesson.push(item);
        this.matiereService.setLastTheme(this.current);
      });
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
