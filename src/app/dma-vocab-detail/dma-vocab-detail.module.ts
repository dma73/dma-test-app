import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DmaVocabDetailComponent } from './dma-vocab-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [DmaVocabDetailComponent]
})
export class DmaVocabDetailModule { }
