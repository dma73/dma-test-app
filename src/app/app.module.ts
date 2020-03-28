import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DmaVocabListComponent } from './dma-vocab-list/dma-vocab-list.component';
import { DmaVocabCoreModule } from './dma-vocab-core/dma-vocab-core.module';
import { DmaVocabSharedModule } from './dma-vocab-shared/dma-vocab-shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DmaVocabDetailComponent } from './dma-vocab-detail/dma-vocab-detail.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { DmaVocabDeleteComponent } from './dma-vocab-delete/dma-vocab-delete.component';
import { CapitalizeFirstPipe } from './dma-vocab-shared/capitalizefirst.pipe';
import { DmaVocabLessonComponent } from './dma-vocab-lesson/dma-vocab-lesson.component';
import { DmaVocabTestComponent } from './dma-vocab-test/dma-vocab-test.component';

@NgModule({
   declarations: [
      AppComponent,
      DmaVocabListComponent,
      DmaVocabDetailComponent,
      DmaVocabDeleteComponent,
      CapitalizeFirstPipe,
      DmaVocabLessonComponent,
      DmaVocabTestComponent
   ],
   imports: [
      NgbModule,
      BrowserModule,
      AppRoutingModule,
      DmaVocabCoreModule,
      DmaVocabSharedModule,
      FontAwesomeModule,
      FormsModule,
      CommonModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
