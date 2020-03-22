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

@NgModule({
   declarations: [
      AppComponent,
      DmaVocabListComponent,
      DmaVocabDetailComponent,
  ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      DmaVocabCoreModule,
      DmaVocabSharedModule,
      FontAwesomeModule,
      FormsModule,
      NgbModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
