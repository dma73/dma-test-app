import { Component, OnInit } from '@angular/core';
import { VocabService } from '../dma-vocab-core/vocab.service';
import { IMatiereItem } from '../dma-vocab-shared/interfaces';
import { MatiereService } from '../dma-vocab-core/matiere.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DmaVocabFilterutils } from '../dma-vocab-shared/dma-vocab-filterutils';

@Component({
  selector: 'app-dma-matiere-delete',
  templateUrl: './dma-matiere-delete.component.html',
  styleUrls: ['./dma-matiere-delete.component.css']
})
export class DmaMatiereDeleteComponent implements OnInit {
  item: IMatiereItem;
  block = true;
  constructor(private service: MatiereService, private vocabService: VocabService,
              private route: ActivatedRoute, private router: Router, private filterUtils: DmaVocabFilterutils) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.getMatiereItem(+id).subscribe((item: IMatiereItem) => {
      this.item = item;
      this.vocabService.getVocabItems().subscribe((items) => {{
        this.block = this.filterUtils.getFilteredItems('matiere', id, items).length > 0;
      }
    });
  });
}
  onSubmit() {
    if (!this.block) {}
    this.service.deleteMatiereItem(this.item.id).subscribe(() => {
      this.router.navigate(['/matierelist']);
    });
  }
  cancel() {
    this.router.navigate(['/matierelist']);
  }

}
