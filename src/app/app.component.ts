import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IMatiereItem } from './dma-vocab-shared/interfaces';
import { OnInit } from '@angular/core';
import { DataService } from './dma-vocab-core/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dma-test-app';
  public isCollapsed = false;
  public activeMatiere: IMatiereItem;
  constructor(private dataService: DataService){

  }
  ngOnInit(): void {
  }
}
