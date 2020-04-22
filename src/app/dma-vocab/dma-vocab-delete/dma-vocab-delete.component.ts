import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../dma-vocab-core/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IVocabItem } from '../dma-vocab-shared/interfaces';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-dma-vocab-delete',
  templateUrl: './dma-vocab-delete.component.html',
  styleUrls: ['./dma-vocab-delete.component.css']
})
export class DmaVocabDeleteComponent implements OnInit {
  vocabItem: IVocabItem;
  theme = '';
  constructor(private dataService: DataService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.theme = this.route.snapshot.paramMap.get('theme');
    this.dataService.getVocabItem(+id).subscribe((vocabItem: IVocabItem) => {
      this.vocabItem = vocabItem;
    });
  }
  onSubmit() {
    this.dataService.deleteVocabItem(this.vocabItem.id).subscribe(() => {
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
