import type { Tournament } from "./tournament";

// export interface Category {
//     id: number;
//     nom: string;
//     sexe: string;
//     date_naissance_min: string;
//     date_naissance_max: string;
//   }

export interface Category {
    id: number;
    nom: string;
    date_naissance_min: string;
    date_naissance_max: string;
    date_ouverture: string;
    date_cloture: string;
    tournament_ID: number;
    Tournament: Tournament;
    variance: number;
  }