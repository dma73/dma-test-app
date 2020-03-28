import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DmaVocabListComponent } from './dma-vocab-list/dma-vocab-list.component';
import { DmaVocabDetailComponent } from './dma-vocab-detail/dma-vocab-detail.component';
import { DmaVocabDeleteComponent } from './dma-vocab-delete/dma-vocab-delete.component';
import { DmaVocabLessonComponent } from './dma-vocab-lesson/dma-vocab-lesson.component';
import { DmaVocabTestComponent } from './dma-vocab-test/dma-vocab-test.component';


const routes: Routes = [
  { path: 'vocablist', component: DmaVocabListComponent },
  { path: 'edit/:id', component: DmaVocabDetailComponent},
  { path: 'delete/:id', component: DmaVocabDeleteComponent},
  { path: 'vocablesson', component: DmaVocabLessonComponent},
  { path: 'vocabtest', component: DmaVocabTestComponent},
  { path: '', pathMatch: 'full', redirectTo: 'vocablist'},
  { path: '**', pathMatch: 'full', redirectTo: 'vocablist' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
