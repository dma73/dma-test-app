export interface IItem {
  id: number;
}
export interface IMatiereItem extends IItem {
  questionlabel: string;
  reponselabel: string;
  intitule: string;
  bidirectionnel: boolean;
  defaultmat: boolean;
  _links?: object;
}
export interface IVocabItem extends IDataItem {
  dataType: DataType;
  data: Array<string>;
}
export interface IDataItem extends IItem {
  maitrise: number;
  niveau: number;
  theme: string;
  contexte: string;
  bidirectionnel: boolean;
  matiereid: number;
  _links?: object;
}
export class DataType {
  constructor() {
    this.type = 'tabular';
  }
  type: string;
}

/*export interface ITabularItem extends IDataItem {
  dataType: DataType;
  data: Array<string>;
}*/

export interface IRESTfulVocabItemList {
  _embedded: IVocabItemList;
  _links: object;
}

export interface IVocabItemList {
  vocabItemList: IVocabItem[];
}

export interface IRESTfulMatiereItemList {
  _embedded: IMatiereItemList;
  _links: object;
}

export interface IMatiereItemList {
  matiereItemList: IMatiereItem[];
}

export interface IMatiereImport {
    LabelReponse: string;
    LabelQuestion: string;
    Intitule: string;
    FileName: string;
    Id: number;
    id?: number;
}

export interface IVocabItemImport {
  Question: string;
  Reponse: string;
  Theme: string;
  Contexte: string;
  Maitrise: number;
  Niveau: number;
}
