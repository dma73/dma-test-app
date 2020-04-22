import { Component, OnInit } from '@angular/core';
import { faEdit, faTrashAlt, faPlus, faGraduationCap, faCheck} from '@fortawesome/free-solid-svg-icons';
import { CapitalizeFirstPipe } from '../dma-vocab-shared/capitalizefirst.pipe';
import { IMatiereItem } from '../dma-vocab-shared/interfaces';
import { DmaVocabUtils } from '../dma-vocab-shared/dma-vocab-utils';
import { MatiereService } from '../dma-vocab-core/matiere.service';

@Component({
  selector: 'app-dma-matiere-list',
  templateUrl: './dma-matiere-list.component.html',
  styleUrls: ['./dma-matiere-list.component.css']
})
export class DmaMatiereListComponent implements OnInit {
  faEdit = faEdit;
  faCheck = faCheck;
  faTrashAlt = faTrashAlt;
  faPlus = faPlus;
  faGraduationCap = faGraduationCap;
  capitalizeFirst: CapitalizeFirstPipe;
  items: IMatiereItem[];
  itemName = 'Matières';
  itemId = 'matiere';
  utils = new DmaVocabUtils();
  constructor(private service: MatiereService) { }

  ngOnInit() {
    this.service.getMatiereItems().subscribe((matieres) => this.items = matieres);
  }
}
