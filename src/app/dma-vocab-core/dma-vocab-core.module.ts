import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DmaVocabCoreComponent } from './dma-vocab-core.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule, HttpClientModule
  ],
  providers: [
    DataService
  ],
  declarations: [DmaVocabCoreComponent]
})
export class DmaVocabCoreModule { }
