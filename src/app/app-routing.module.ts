import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DmaVocabListComponent } from './dma-vocab-list/dma-vocab-list.component';
import { DmaVocabDetailComponent } from './dma-vocab-detail/dma-vocab-detail.component';


const routes: Routes = [
  { path: 'vocablist', component: DmaVocabListComponent },
  { path: 'edit/:id', component: DmaVocabDetailComponent},
  { path: '', pathMatch: 'full', redirectTo: 'vocablist'},
  { path: '**', pathMatch: 'full', redirectTo: 'vocablist' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
