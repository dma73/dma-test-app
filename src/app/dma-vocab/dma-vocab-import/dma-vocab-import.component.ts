import { Component, OnInit } from '@angular/core';
import { IMatiereImport, IVocabItemImport } from '../dma-vocab-shared/interfaces';

@Component({
  selector: 'app-dma-vocab-import',
  templateUrl: './dma-vocab-import.component.html',
  styleUrls: ['./dma-vocab-import.component.css']
})
export class DmaVocabImportComponent implements OnInit {
  matiereFile: any;
  file: any;
  matieres: IMatiereImport[];
  items: IVocabItemImport[];
  label: string;
  constructor() { }

  ngOnInit() {
  }

matiereFileChanged(e) {
    this.matiereFile = e.target.files[0];
}
fileChanged(e) {
  const n = 'name';
  const name: string = e.target.files[0][n];
  if (this.matieres[0].FileName === name) {
    this.file = e.target.files[0];
  }
}
importMatieres() {
  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    console.log(this.matiereFile);
    const data: string = String(fileReader.result);

    console.log(data);
    this.matieres = JSON.parse(data) as IMatiereImport[];
    this.matieres.forEach((item) => {
      console.log(item.FileName);
    });
    this.refresh();
  };
  fileReader.readAsText(this.matiereFile);
}
refresh() {
  if (this.matieres && this.matieres.length > 0) {
    this.label = 'Choisissez le fichier de données pour ' + this.matieres[0].Intitule + '(' + this.matieres[0].FileName + ')';
  } else {
    this.label = undefined;
  }
}
importMatiere() {
  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    console.log(this.file);
    const data = String(fileReader.result);
    console.log(data);
    this.items = JSON.parse(data) as IVocabItemImport[];
    this.items.forEach((item) => {
      console.log(item.Question);
    });
    this.file = undefined;
    this.matieres = this.matieres.slice(1);
    this.refresh();
  };
  fileReader.readAsText(this.file);
}
}
