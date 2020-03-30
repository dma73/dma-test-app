export interface IVocabItem {
  anglais: string;
  francais: string;
  id: number;
  maitrise: number;
  niveau: number;
  theme: string;
  contexte: string;
  _links?: object;
}

export interface IRESTfulVocabItemList {
  _embedded: IVocabItemList;
  _links: object;
}

export interface IVocabItemList {
  vocabItemList: IVocabItem[];
}
