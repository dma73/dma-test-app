import { Component, OnInit } from '@angular/core';
import { DataService } from '../dma-vocab-core/data.service';
import { IVocabItem } from '../dma-vocab-shared/interfaces';
import { faEdit, faTrashAlt, faPlus, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dma-vocab-list',
  templateUrl: './dma-vocab-list.component.html',
  styleUrls: ['./dma-vocab-list.component.css']
})
export class DmaVocabListComponent implements OnInit {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  faGraduationCap = faGraduationCap;
  items: IVocabItem[];
  title: string;
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.title = 'Liste de vocabulaire';
    this.dataService.getVocabItems().subscribe((vocabItems: IVocabItem[]) => this.items = vocabItems);
  }
  onDelete(id: number) {
    console.log('delete id:' + id);
    this.dataService.deleteVocabItem(id).subscribe({
      next: (vocabItem: IVocabItem) => {
        this.items.splice(
          this.items.findIndex(d => d.id === id), 1
        );
        console.log('items:' + this.items);
      }
      , error: null
    });
  }
  getColor(maitrise: number): string {
    if (maitrise === 0) { return 'darkred'; }
    if (maitrise === 1) { return 'orangered'; }
    if (maitrise === 2) { return 'darkorange'; }
    if (maitrise === 3) { return 'gold'; }
    if (maitrise === 4) { return 'green'; }
  }
}
