import { Component, OnInit, OnDestroy } from '@angular/core';
import { IVocabItem, IMatiereItem, ITabularItem } from '../dma-vocab-shared/interfaces';
import {
  faEdit,
  faTrashAlt,
  faPlus,
  faGraduationCap
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CapitalizeFirstPipe } from '../dma-vocab-shared/capitalizefirst.pipe';
import { DmaVocabUtils } from '../dma-vocab-shared/dma-vocab-utils';
import { VocabService } from '../dma-vocab-core/vocab.service';
import { MatiereService } from '../dma-vocab-core/matiere.service';
import { DmaVocabFilterutils } from '../dma-vocab-shared/dma-vocab-filterutils';

@Component({
  selector: 'app-dma-tabular-list',
  templateUrl: './dma-tabular-list.component.html',
  styleUrls: ['./dma-tabular-list.component.css']
})
export class DmaTabularListComponent implements OnInit, OnDestroy {

  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  faGraduationCap = faGraduationCap;
  capitalizeFirst: CapitalizeFirstPipe;
  items: ITabularItem[];
  title: string;
  headers: string[];
  utils: DmaVocabUtils = new DmaVocabUtils();
  matiere: IMatiereItem;
  subscription: Subscription;

  constructor(
    private dataService: VocabService,
    private matiereService: MatiereService,
    private filterUtils: DmaVocabFilterutils
  ) {
    this.subscription = this.matiereService.getMatiere().subscribe(matiere => {
      if (matiere) {
        this.matiere = matiere;
        this.loadHeaders(matiere);
        this.loadData(matiere);
      }
    });
  }
  loadHeaders(matiere: IMatiereItem) {
      this.headers = this.utils.initHeaders(matiere);
  }
  ngOnInit() {
    this.matiereService
      .getCurrentOrDefaultItem()
      .subscribe((matiereItem: IMatiereItem) => {
        this.loadData(matiereItem);
      });
  }
  loadData(matiereItem: IMatiereItem) {
    this.matiere = matiereItem;
    // console.log('list loadData initial value: ' + (this.matiere ? this.matiere.intitule : this.matiere));
    this.dataService
      .getVocabItems()
      .subscribe((vocabItems: IVocabItem[]) => {
        this.items = new Array<ITabularItem>();
        this.filterUtils.getFilteredItems(
          'matiere',
          '' + this.matiere.id,
          vocabItems
        ).forEach((item) => {
          this.items.push(this.utils.vocabToTabular(item));
        });
      });

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
