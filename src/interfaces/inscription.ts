import type { Category } from "./category";
import type { RegisteredJudoka } from "./judoka";
import type { RegisteredClub } from "./club";

export interface Inscription {
    poid: number;
    ceinture: string;
    judoka_ID: number;
    category_ID: number;
    club_ID: number;
  }

export interface RegisteredInscription extends Inscription {
  id: number;
  Club: RegisteredClub;
  Judoka: RegisteredJudoka;
  Category: Category;
}