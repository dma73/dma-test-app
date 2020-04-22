import { Component, OnInit } from '@angular/core';
import { DataService } from '../dma-vocab-core/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IVocabItem, IMatiereItem } from '../dma-vocab-shared/interfaces';
import { MatiereService } from '../dma-vocab-core/matiere.service';

@Component({
  selector: 'app-dma-vocab-detail',
  templateUrl: './dma-vocab-detail.component.html',
  styleUrls: ['./dma-vocab-detail.component.css']
})
export class DmaVocabDetailComponent implements OnInit {
  vocabItem: IVocabItem;
  matiere: IMatiereItem;
  submitted = false;
  theme = '';
  newtheme = false;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private matiereService: MatiereService,
              private router: Router) {
  }

  initTheme() {
    this.theme = this.route.snapshot.paramMap.get('theme');
    if (this.theme === 'nouveau') {
      this.theme = '';
      this.newtheme = true;
    }
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.initTheme();
    this.matiereService.getCurrentOrDefaultItem().subscribe(
      (matiereItem: IMatiereItem) => {
        this.matiere = matiereItem;
        if (+id === 0) {
          const vocabItem = {} as IVocabItem;
          vocabItem.id = 0;
          vocabItem.contexte = '';
          vocabItem.theme = this.theme;
          vocabItem.bidirectionnel = this.matiere.bidirectionnel;
          vocabItem.matiereid = this.matiere.id;
          this.vocabItem = vocabItem;
        } else {
          this.dataService.getVocabItem(+id).subscribe((vocabItem: IVocabItem) => {
            this.vocabItem = vocabItem;
          });
        }
      });
  }
  onSubmit() {
    this.submitted = true;
    this.dataService.saveVocabItem(+(this.vocabItem).id, this.vocabItem).subscribe((vocabItem: IVocabItem) => {
      this.vocabItem = vocabItem;
      this.submitted = false;
      if (this.newtheme) {
        this.theme = vocabItem.theme;
        this.newtheme = false;
      }
      if (this.theme === '') {
        this.router.navigate(['/vocablist']);
      } else {
        this.router.navigate(['/vocablesson', this.theme]);
      }
    });
  }
}
