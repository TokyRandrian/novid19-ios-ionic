import { Lieu } from './lieux';

export interface Historique {
  _id: String;
  lieu_id: String;
  personne_id: String;
  date_passage: Date;
}

export interface PassageToInsert {
  lieu_id: String;
  personne_id: String;
  date_passage: Date;
}

export interface HistoriqueToDisp {
  _id: String;
  lieu: Lieu;
  pesonne_id: String;
  date_passage: Date;
}
