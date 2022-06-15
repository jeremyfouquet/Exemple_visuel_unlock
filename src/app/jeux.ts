import { Indice } from "./indice";
import { Joueur } from "./joueur";

export class Jeux {
    public id: number = 0;
    public nom: string = "Tutorial";
    public equipe: Array<Joueur> = [];
    public statut: Statut = Statut.enAttente;
    public chrono: number = 600;
    public indices: Indice[] = [];
    public deck: Indice[] = [];
    public code: number = 0;
}

export enum Statut {
    enCours,
    enAttente
}


