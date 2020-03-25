import { NgModule } from '@angular/core';
import { DmaVocabDetailComponent } from './dma-vocab-detail.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [DmaVocabDetailComponent]
})
export class DmaVocabDetailModule { }
