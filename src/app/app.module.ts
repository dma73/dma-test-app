import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { DmaMathModule } from './dma-math/dma-math.module';
import { DmaVocabModule } from './dma-vocab/dma-vocab.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      NgbModule,
      BrowserModule,
      AppRoutingModule,
      FontAwesomeModule,
      FormsModule,
      CommonModule,
      RouterModule,
      DmaVocabModule,
      DmaMathModule,
      HttpClientModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
