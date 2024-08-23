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
    genre: string;
    date_naissance_min: string;
    date_naissance_max: string;
    Poid_Min: number;
    Poid_Max: number;
    date_ouverture: string;
    date_cloture: string;
    tournament_ID: number;
    Tournament: Tournament;
    variance: number;
  }