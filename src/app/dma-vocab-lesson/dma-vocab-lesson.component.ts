import { Component, OnInit } from '@angular/core';
import { IVocabItem } from '../dma-vocab-shared/interfaces';
import { DataService } from '../dma-vocab-core/data.service';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { DmaVocabUtils } from '../dma-vocab-shared/dma-vocab-utils';

@Component({
  selector: 'app-dma-vocab-lesson',
  templateUrl: './dma-vocab-lesson.component.html',
  styleUrls: ['./dma-vocab-lesson.component.css']
})
export class DmaVocabLessonComponent implements OnInit {
  lessons: Set<string> = new Set<string>();
  faGraduationCap = faGraduationCap;
  words: IVocabItem[];
  utils: DmaVocabUtils = new DmaVocabUtils();
  current = '';
  currentLesson: IVocabItem[] = new Array<IVocabItem>();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getVocabItems().subscribe((vocabItems: IVocabItem[]) => {
      this.words = vocabItems;
      vocabItems.forEach((vocabitem: IVocabItem) => {
        this.lessons.add(vocabitem.theme);
      });
    });
  }
  getWords(theme: string): IVocabItem[] {
    const lecon: IVocabItem[] = new Array<IVocabItem>();
    if (this.words){
      this.words.forEach((word) => {
        if (word.theme === theme) {
          lecon.push(word);
        }
      });
    }
    return lecon;
  }
  refresh() {
    if (this.current !== '') {
      this.currentLesson = this.getWords(this.current);
    }
  }
}
