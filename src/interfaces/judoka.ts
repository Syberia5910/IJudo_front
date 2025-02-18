import type { Club } from "./club";

export interface Judoka {
  nom: string;
  prenom: string;
  sexe: string;
  date_naissance: string;
}

export interface RegisteredJudoka extends Judoka {
  id: number;
}