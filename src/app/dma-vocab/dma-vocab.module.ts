import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DmaVocabDeleteComponent } from './dma-vocab-delete/dma-vocab-delete.component';
import { DmaVocabListComponent } from './dma-vocab-list/dma-vocab-list.component';
import { DmaVocabDetailComponent } from './dma-vocab-detail/dma-vocab-detail.component';
import { DmaVocabLessonComponent } from './dma-vocab-lesson/dma-vocab-lesson.component';
import { DmaVocabTestComponent } from './dma-vocab-test/dma-vocab-test.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CapitalizeFirstPipe } from './dma-vocab-shared/capitalizefirst.pipe';
import { InputFocusDirective } from './dma-vocab-shared/input-focus-directive';
import { DmaVocabImportComponent } from './dma-vocab-import/dma-vocab-import.component';
import { DmaMatiereListComponent } from './dma-matiere-list/dma-matiere-list.component';
import { DmaMatiereDeleteComponent } from './dma-matiere-delete/dma-matiere-delete.component';
import { DmaMatiereDetailComponent } from './dma-matiere-detail/dma-matiere-detail.component';
import { DmaTabularListComponent } from './dma-tabular-list/dma-tabular-list.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    CapitalizeFirstPipe,
    InputFocusDirective,
    DmaVocabDeleteComponent,
    DmaVocabListComponent,
    DmaTabularListComponent,
    DmaVocabDetailComponent,
    DmaVocabDeleteComponent,
    DmaVocabLessonComponent,
    DmaVocabTestComponent,
    DmaVocabImportComponent,
    DmaMatiereListComponent,
    DmaMatiereDetailComponent,
    DmaMatiereDeleteComponent
  ],
  exports: [
  ]
})
export class DmaVocabModule { }
