import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VocabService } from '../dma-vocab-core/vocab.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IVocabItem, IMatiereItem, ITabularItem } from '../dma-vocab-shared/interfaces';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatiereService } from '../dma-vocab-core/matiere.service';
import { DmaVocabUtils } from '../dma-vocab-shared/dma-vocab-utils';


@Component({
  selector: 'app-dma-vocab-delete',
  templateUrl: './dma-vocab-delete.component.html',
  styleUrls: ['./dma-vocab-delete.component.css']
})
export class DmaVocabDeleteComponent implements OnInit {
  tabularItem: ITabularItem;
  theme = '';
  headers: Array<string>;
  constructor(private vocabService: VocabService, private matiereService: MatiereService,
              private route: ActivatedRoute, private router: Router, private utils: DmaVocabUtils) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.theme = this.route.snapshot.paramMap.get('theme');
    this.matiereService.getCurrentOrDefaultItem().subscribe(
      (matiereItem: IMatiereItem) => {
        this.headers = this.utils.initHeaders(matiereItem);
        this.vocabService.getVocabItem(+id).subscribe((vocabItem: IVocabItem) => {
      this.tabularItem = this.utils.vocabToTabular(vocabItem);
    });
    });
  }
  onSubmit() {
    this.vocabService.deleteVocabItem(this.tabularItem.id).subscribe(() => {
      if (this.theme === '') {
        this.router.navigate(['/vocablist']);
      } else {
        this.router.navigate(['/vocablesson', this.theme]);
      }
    });
  }
  cancel() {
    if (this.theme === '') {
      this.router.navigate(['/vocablist']);
    } else {
      this.router.navigate(['/vocablesson', this.theme]);
    }
  }
}
