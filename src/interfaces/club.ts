// export interface Club {
//     id: number;
//     nom: string;
// }

export interface Club {
    nom: string;
}

export interface RegisteredClub extends Club {
    id: number,
}