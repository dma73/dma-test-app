import { Component, OnInit } from '@angular/core';
import { DataService } from '../dma-vocab-core/data.service';
import { IVocabItem } from '../dma-vocab-shared/interfaces';
import { faEdit, faTrashAlt, faPlus, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { CapitalizeFirstPipe } from '../dma-vocab-shared/capitalizefirst.pipe';
import { DmaVocabUtils } from '../dma-vocab-shared/dma-vocab-utils';

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
  capitalizeFirst: CapitalizeFirstPipe;
  items: IVocabItem[];
  title: string;
  utils: DmaVocabUtils = new DmaVocabUtils();

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
  onSort(colname: string) {
  }
}
