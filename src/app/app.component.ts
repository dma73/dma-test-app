import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { IMatiereItem } from './dma-vocab/dma-vocab-shared/interfaces';
import { MatiereService } from './dma-vocab/dma-vocab-core/matiere.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dma-test-app';
  public isCollapsed = false;
  public currentmatiere: IMatiereItem;
  public matieres: Array<IMatiereItem>;
  public matiereid = 0;
  constructor(private matiereService: MatiereService,
              private route: ActivatedRoute,
              private router: Router) {

  }
  ngOnInit(): void {
    this.matiereService
      .getCurrentOrDefaultItem()
      .subscribe((matiere: IMatiereItem) => {
        this.currentmatiere = matiere;
        this.matiereid = matiere.id;
        this.matiereService.getMatiereItems()
          .subscribe((matieres: IMatiereItem[]) => {
            this.matieres = matieres;
          });
      });
  }
  refresh(): void {
    console.log('refresh');
    console.log(this.currentmatiere.intitule);
    this.matiereService.getMatiereItem(this.matiereid)
      .subscribe((matiere: IMatiereItem) => {
        const matiereArray: Array<IMatiereItem> = new Array<IMatiereItem>();
        matiereArray.push(matiere);
        this.matiereService.setMatiere(matiereArray);
        // this.matiereService.setCurrentMatiere(matiere);
        this.currentmatiere = matiere;
        // this.router.navigate(['/vocablist', '' + this.matiereid]);
      });
  }
}
