import { Component, OnInit } from '@angular/core';
import { IVocabItem, IMatiereItem } from '../dma-vocab-shared/interfaces';
import { DataService } from '../dma-vocab-core/data.service';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { DmaVocabUtils } from '../dma-vocab-shared/dma-vocab-utils';
import { DmaVocabFilterutils } from '../dma-vocab-shared/dma-vocab-filterutils';
import { MatiereService } from '../dma-vocab-core/matiere.service';

@Component({
  selector: 'app-dma-vocab-lesson',
  templateUrl: './dma-vocab-lesson.component.html',
  styleUrls: ['./dma-vocab-lesson.component.css']
})
export class DmaVocabLessonComponent implements OnInit {
  lessons: Set<string> = new Set<string>();
  faGraduationCap = faGraduationCap;
  words: IVocabItem[];
  current = '';
  currentLesson: IVocabItem[] = new Array<IVocabItem>();
  utils: DmaVocabUtils = new DmaVocabUtils();
  matiereItem: IMatiereItem;

  constructor(private dataService: DataService,
              private filterUtils: DmaVocabFilterutils,
              private matiereService: MatiereService) { }

  ngOnInit() {
    this.matiereService
      .getCurrentOrDefaultItem()
      .subscribe((matiereItem: IMatiereItem) => {
        this.matiereItem = matiereItem;
        this.dataService.getVocabItems().subscribe((vocabItems: IVocabItem[]) => {
      this.words = this.filterUtils.getFilteredItems(
        'matiere',
        '' + matiereItem.id,
        vocabItems
      );
      this.words.forEach((vocabitem: IVocabItem) => {
        if (this.lessons.size === 0) {
          this.current = vocabitem.theme;
          this.refresh();
        }
        this.lessons.add(vocabitem.theme);
      });
    });
  });
  }
  refresh() {
    if (this.current !== '') {
      this.currentLesson = this.filterUtils.getFilteredItems('theme', this.current, this.words);
    }
  }
}
