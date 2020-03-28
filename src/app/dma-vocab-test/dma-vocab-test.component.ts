import { Component, OnInit } from '@angular/core';
import { DataService } from '../dma-vocab-core/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DmaVocabFilterutils } from '../dma-vocab-shared/dma-vocab-filterutils';
import { IVocabItem } from '../dma-vocab-shared/interfaces';

@Component({
  selector: 'app-dma-vocab-test',
  templateUrl: './dma-vocab-test.component.html',
  styleUrls: ['./dma-vocab-test.component.css']
})
export class DmaVocabTestComponent implements OnInit {
  testItems: IVocabItem[];

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private filterUtils: DmaVocabFilterutils) { }

  ngOnInit() {
    const theme = this.route.snapshot.paramMap.get('theme');
    this.dataService.getVocabItems().subscribe((vocabItems: IVocabItem[]) => {
      let items: IVocabItem[] = new Array<IVocabItem>();
      items = this.filterUtils.getWords('theme', theme, vocabItems);
      this.testItems = items;
      let filtered: IVocabItem[] = this.filterUtils.getWords('maitrise', '4', vocabItems);
      if (filtered.length > 0) {
        this.testItems.push(filtered[this.randomInt(filtered.length)]);
      }
      filtered = this.filterUtils.getWords('maitrise', '3', vocabItems);
      if (filtered.length > 0) {
        while (this.testItems.length <= 2) {
          this.testItems.push(filtered[this.randomInt(filtered.length)]);
        }
      }

    });
    /*
    test = new List<Mot>();
                Random random = new Random();
                List<Mot> filtered = filtered1.FindAll(mot => mot.Maitrise == 4);
    if ( filtered.Count > 0)
                {
                    test.Add(filtered[random.Next(0, filtered.Count)]);
                }
    filtered = filtered1.FindAll(mot => mot.Maitrise == 3 );
    if (filtered.Count > 0)
                {
                    while (test.Count <= 2)
                    {
                        test.Add(filtered[random.Next(0, filtered.Count)]);
                    }
                }
    filtered = filtered1.FindAll(mot => mot.Maitrise == 2 );
    if (filtered.Count > 0)
                {
                    while (test.Count <= 5)
                    {
                        test.Add(filtered[random.Next(0, filtered.Count)]);
                    }
                }
    filtered = filtered1.FindAll(mot => mot.Maitrise == 1 );
    if (filtered.Count > 0)
                {
                    while (test.Count <= 9)
                    {
                        test.Add(filtered[random.Next(0, filtered.Count)]);
                    }
                }
    filtered = filtered1.FindAll(mot => mot.Maitrise == 0 );
    if (filtered.Count > 0)
                {
                    while (test.Count <= 19)
                    {
                        test.Add(filtered[random.Next(0, filtered.Count)]);
                    }
            }
    testSize = test.Count;
    showQuestion();*/
  }
  randomInt( max: number): number {
    return Math.floor(Math.random() * (max));
 }
}
