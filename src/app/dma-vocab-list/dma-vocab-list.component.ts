import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../dma-vocab-core/data.service';
import { IVocabItem, IMatiereItem } from '../dma-vocab-shared/interfaces';
import {
  faEdit,
  faTrashAlt,
  faPlus,
  faGraduationCap
} from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { CapitalizeFirstPipe } from '../dma-vocab-shared/capitalizefirst.pipe';
import { DmaVocabUtils } from '../dma-vocab-shared/dma-vocab-utils';
import { MatiereService } from '../dma-vocab-core/matiere.service';
import { DmaVocabFilterutils } from '../dma-vocab-shared/dma-vocab-filterutils';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dma-vocab-list',
  templateUrl: './dma-vocab-list.component.html',
  styleUrls: ['./dma-vocab-list.component.css']
})
export class DmaVocabListComponent implements OnInit, OnDestroy {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  faGraduationCap = faGraduationCap;
  capitalizeFirst: CapitalizeFirstPipe;
  items: IVocabItem[];
  title: string;
  utils: DmaVocabUtils = new DmaVocabUtils();
  matiere: IMatiereItem;
  subscription: Subscription;

  constructor(
    private dataService: DataService,
    private matiereService: MatiereService,
    private filterUtils: DmaVocabFilterutils
  ) {
    this.subscription = this.matiereService.getMatiere().subscribe(matiere => {
      if (matiere) {
        this.matiere = matiere;
        this.loadData();
      }
    });
   }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.matiereService
      .getCurrentOrDefaultItem()
      .subscribe((matiereItem: IMatiereItem) => {
        this.matiere = matiereItem;
        console.log('list ngOnInit initial value: ' + (this.matiere ? this.matiere.intitule : this.matiere));
        this.dataService
          .getVocabItems()
          .subscribe((vocabItems: IVocabItem[]) => {
            this.items = this.filterUtils.getFilteredItems(
              'matiere',
              '' + this.matiere.id,
              vocabItems
            );
          });
      });

  }
  onDelete(id: number) {
    console.log('delete id:' + id);
    this.dataService.deleteVocabItem(id).subscribe({
      next: (vocabItem: IVocabItem) => {
        this.items.splice(
          this.items.findIndex(d => d.id === id),
          1
        );
        console.log('items:' + this.items);
      },
      error: null
    });
  }
  onSort(colname: string) { }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
