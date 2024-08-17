import type { Category } from "./category";
import type { Judoka } from "./judoka";

export interface Inscription {
    id: number;
    poid: number;
    ceinture: string;
    judoka_ID: number;
    Judoka: Judoka;
    category_ID: number;
    Category: Category;
  }