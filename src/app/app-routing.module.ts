import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DmaVocabListComponent } from './dma-vocab/dma-vocab-list/dma-vocab-list.component';
import { DmaVocabDetailComponent } from './dma-vocab/dma-vocab-detail/dma-vocab-detail.component';
import { DmaVocabDeleteComponent } from './dma-vocab/dma-vocab-delete/dma-vocab-delete.component';
import { DmaVocabLessonComponent } from './dma-vocab/dma-vocab-lesson/dma-vocab-lesson.component';
import { DmaVocabTestComponent } from './dma-vocab/dma-vocab-test/dma-vocab-test.component';
import { DmaMathPolyComponent } from './dma-math/dma-math-poly/dma-math-poly.component';
import { DmaVocabImportComponent } from './dma-vocab/dma-vocab-import/dma-vocab-import.component';
import { DmaMatiereListComponent } from './dma-vocab/dma-matiere-list/dma-matiere-list.component';
import { DmaMatiereDetailComponent } from './dma-vocab/dma-matiere-detail/dma-matiere-detail.component';
import { DmaMatiereDeleteComponent } from './dma-vocab/dma-matiere-delete/dma-matiere-delete.component';
import { DmaTabularListComponent } from './dma-vocab/dma-tabular-list/dma-tabular-list.component';


const routes: Routes = [
  // { path: 'vocablist', component: DmaVocabListComponent },
  { path: 'vocablist', component: DmaTabularListComponent },
  { path: 'matierelist', component: DmaMatiereListComponent },
  { path: 'matiereedit/:id', component: DmaMatiereDetailComponent},
  { path: 'matieredelete/:id', component: DmaMatiereDeleteComponent},
  { path: 'edit/:id/:theme', component: DmaVocabDetailComponent},
  { path: 'delete/:id/:theme', component: DmaVocabDeleteComponent},
  { path: 'vocablesson/:theme', component: DmaVocabLessonComponent},
  { path: 'vocabtest/:theme', component: DmaVocabTestComponent},
  { path: 'poly', component: DmaMathPolyComponent},
  { path: 'import', component: DmaVocabImportComponent},
  { path: '', pathMatch: 'full', redirectTo: '/vocablist'},
  { path: '**', pathMatch: 'full', redirectTo: '/vocablist' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
