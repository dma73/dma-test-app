import { Component, OnInit } from '@angular/core';
import { DataService } from '../dma-vocab-core/data.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { IVocabItem } from '../dma-vocab-shared/interfaces';
import { NgForm } from '@angular/forms';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-dma-vocab-detail',
  templateUrl: './dma-vocab-detail.component.html',
  styleUrls: ['./dma-vocab-detail.component.css']
})
export class DmaVocabDetailComponent implements OnInit {
  vocabItem: IVocabItem;
  submitted = false;

  constructor(private dataService: DataService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (+id === 0) {
      const vocabItem = {} as IVocabItem;
      vocabItem.id = 0;
      this.vocabItem = vocabItem;
    } else {
      this.dataService.getVocabItem(+id).subscribe((vocabItem: IVocabItem) => {
        this.vocabItem = vocabItem;
      });
    }
  }
  onSubmit(it: NgForm) {
    console.log(it.value);  // { first: '', last: '' }
    console.log(it.valid);  // false
    this.submitted = true;
    this.dataService.saveVocabItem(+( this.vocabItem).id, this.vocabItem).subscribe((vocabItem: IVocabItem) => {
      this.vocabItem = vocabItem;
      this.submitted = false;
      this.router.navigate(['/vocabitems']);
    });
  }
}
