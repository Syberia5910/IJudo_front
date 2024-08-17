import type { Club } from "./club";

export interface Judoka {
    id: number;
    nom: string;
    prenom: string;
    sexe: string;
    date_naissance: string;
    club_ID: number;
    Club: Club;
  }