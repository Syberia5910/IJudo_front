import type { RegisteredInscription } from "./inscription";

export interface Pool {
    id: number;
    nom: string;
    Registration: RegisteredInscription[];
  }