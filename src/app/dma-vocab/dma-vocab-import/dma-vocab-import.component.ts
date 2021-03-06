import { Component, OnInit } from '@angular/core';
import { IMatiereImport, IVocabItemImport, IVocabItem, IMatiereItem, DataType } from '../dma-vocab-shared/interfaces';
import { VocabService } from '../dma-vocab-core/vocab.service';
import { MatiereService } from '../dma-vocab-core/matiere.service';

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
  constructor(private vocabService: VocabService, private matiereService: MatiereService) { }

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
copyMatiere(db: IMatiereItem, imp: IMatiereImport ): IMatiereImport {
  imp.Id = db.id;
  imp.LabelQuestion = db.questionlabel;
  imp.LabelReponse = db.reponselabel;

  return imp;
}
importMatieres() {
  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    console.log(this.matiereFile);
    const data: string = String(fileReader.result);

    console.log(data);
    this.matieres = JSON.parse(data) as IMatiereImport[];
    this.matieres.forEach((item) => {
       this.processItem(item);
    });
    this.refresh();
  };
  fileReader.readAsText(this.matiereFile);
}
processItem(item: IMatiereImport) {
  let saved: IMatiereItem =  this.matiereService.getItemByIntitule(item.Intitule);
  if (saved !== undefined) {
    item = this.copyMatiere(saved, item);
  } else {
    saved = {} as IMatiereItem;
    saved.intitule = item.Intitule;
    saved.questionlabel = item.LabelQuestion;
    saved.reponselabel = item.LabelReponse;
    saved.bidirectionnel = true;
    saved.defaultmat = false;
    saved.id = 0;
  }
  this.matiereService.saveMatiereItem(saved.id, saved)
  .subscribe((savedItem) => {
    item.Id = savedItem.id;
    item.id = savedItem.id;
    console.log(item.FileName, savedItem.id, item.Id);
  });
}
refresh() {
  if (this.matieres && this.matieres.length > 0) {
    this.label = 'Choisissez le fichier de donn??es pour ' + this.matieres[0].Intitule + '(' + this.matieres[0].FileName + ')';
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
    let count = 0;
    this.items.forEach((item) => {
      const tosave = {} as IVocabItem;
      tosave.dataType = new DataType();
      tosave.data = [item.Question, item.Reponse];
      tosave.theme = item.Theme;
      tosave.matiereid = this.matieres[0].id;
      tosave.maitrise = item.Maitrise;
      tosave.niveau = item.Niveau;
      tosave.bidirectionnel = true;
      tosave.contexte = '';
      console.log(item.Question, item.Maitrise, tosave.data, tosave.maitrise, tosave.niveau);
      this.vocabService.saveVocabItem(0, tosave).subscribe((vocabItem) => count ++);
    });
    console.log(count + ' items saved');
    this.file = undefined;
    this.matieres = this.matieres.slice(1);
    this.refresh();
  };
  fileReader.readAsText(this.file);
}
}
