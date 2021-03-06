import { Component, OnInit } from '@angular/core';
import { VocabService } from '../dma-vocab-core/vocab.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IVocabItem, IMatiereItem, DataType } from '../dma-vocab-shared/interfaces';
import { MatiereService } from '../dma-vocab-core/matiere.service';
import { DmaVocabUtils } from '../dma-vocab-shared/dma-vocab-utils';

@Component({
  selector: 'app-dma-vocab-detail',
  templateUrl: './dma-vocab-detail.component.html',
  styleUrls: ['./dma-vocab-detail.component.css']
})
export class DmaVocabDetailComponent implements OnInit {
  vocabItem: IVocabItem;
  matiere: IMatiereItem;
  headers: Array<string>;
  submitted = false;
  theme = '';
  newtheme = false;

  constructor(private vocabService: VocabService,
              private route: ActivatedRoute,
              private matiereService: MatiereService,
              private router: Router,
              private utils: DmaVocabUtils) {
  }

  initTheme() {
    this.theme = this.route.snapshot.paramMap.get('theme');
    if (this.theme === 'nouveau') {
      this.theme = '';
      this.newtheme = true;
    }
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.initTheme();
    this.matiereService.getCurrentOrDefaultItem().subscribe(
      (matiereItem: IMatiereItem) => {
        this.matiere = matiereItem;
        this.headers = this.utils.initHeaders(matiereItem);
        if (+id === 0) {
          this.vocabItem = this.newItem(matiereItem);
        } else {
          this.vocabService.getVocabItem(+id).subscribe((vocabItem: IVocabItem) => {
            this.vocabItem = vocabItem;
          });
        }
      });
  }

  newItem(matiere: IMatiereItem): IVocabItem {
    const item = {} as IVocabItem;
    item.id = 0;
    item.contexte = '';
    item.dataType = new DataType();
    item.data = this.utils.newStringArray(this.headers.length);
    item.theme = this.theme;
    item.bidirectionnel = this.matiere.bidirectionnel;
    item.matiereid = this.matiere.id;
    item.maitrise = 0;
    item.niveau = 0;
    return item;
  }
  onSubmit() {
    this.submitted = true;
    this.vocabService.saveVocabItem((this.vocabItem).id, this.vocabItem).subscribe((vocabItem: IVocabItem) => {
      this.vocabItem = vocabItem;
      this.submitted = false;
      if (this.newtheme) {
        this.theme = vocabItem.theme;
        this.newtheme = false;
      }
      if (this.theme === '') {
        this.router.navigate(['/vocablist']);
      } else {
        this.router.navigate(['/vocablesson', this.theme]);
      }
    });
  }
  indexTracker(index: number, value: any) {
    return index;
  }
}
