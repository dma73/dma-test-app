export interface IMatiereItem {
  question: string;
  reponse: string;
  id: number;
  maitrise: number;
  niveau: number;
  theme: string;
  contexte: string;
  bidirectionnel: boolean;
  matiereid: number;
  _links?: object;
}

export interface IMatiereItem {
  id: number;
  questionlabel: string;
  reponselabel: string;
  intitule: string;
  bidirectionnel: boolean;
  _links?: object;
}
export interface IVocabItem {
  question: string;
  reponse: string;
  id: number;
  maitrise: number;
  niveau: number;
  theme: string;
  contexte: string;
  bidirectionnel: boolean;
  matiereid: number;
  _links?: object;
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
