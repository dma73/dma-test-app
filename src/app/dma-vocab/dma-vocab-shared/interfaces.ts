export interface IMatiereItem {
  id: number;
  questionlabel: string;
  reponselabel: string;
  intitule: string;
  bidirectionnel: boolean;
  defaultmat: boolean;
  _links?: object;
}
export interface IVocabItem extends IDataItem {
  reponse: string;
}
export interface IDataItem {
  question: string;
  id: number;
  maitrise: number;
  niveau: number;
  theme: string;
  contexte: string;
  bidirectionnel: boolean;
  matiereid: number;
  _links?: object;
}
export interface ITabularItem extends IDataItem {
  reponse: string[];
}

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
}

export interface IVocabItemImport {
  Question: string;
  Reponse: string;
  Theme: string;
  Contexte: string;
  Maitrise: number;
  Niveau: number;
}
