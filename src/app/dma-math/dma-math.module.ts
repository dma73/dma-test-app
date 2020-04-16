import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DmaMathPolyComponent } from './dma-math-poly/dma-math-poly.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  declarations: [DmaMathPolyComponent]
})
export class DmaMathModule { }
