import { Component, OnInit } from '@angular/core';
import { IMatiereItem } from '../dma-vocab-shared/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { MatiereService } from '../dma-vocab-core/matiere.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dma-matiere-detail',
  templateUrl: './dma-matiere-detail.component.html',
  styleUrls: ['./dma-matiere-detail.component.css']
})
export class DmaMatiereDetailComponent implements OnInit {
  item: IMatiereItem;

  constructor(private route: ActivatedRoute,
              private service: MatiereService,
              private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (+id === 0) {
      const matiereItem = {} as IMatiereItem;
      matiereItem.id = 0;
      matiereItem.intitule = '';
      matiereItem.questionlabel = '';
      matiereItem.reponselabel = '';
      matiereItem.bidirectionnel = true;
      matiereItem.defaultmat = false;
      this.item = matiereItem;
    } else {
      this.service.getMatiereItem(+id).subscribe(
        (matiereItem: IMatiereItem) => {
          this.item = matiereItem;
        }
      );
    }
  }
  onSubmit(it: NgForm) {
    this.service.saveMatiereItem(+(this.item).id, this.item).subscribe((matiereItem: IMatiereItem) => {
      this.item = matiereItem;
      this.router.navigate(['/matierelist']);
    });
  }
}
