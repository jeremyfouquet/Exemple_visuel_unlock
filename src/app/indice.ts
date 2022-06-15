export abstract class Indice {
    id: number = 0;
    nom: string = "";
    description: string = "";
    img: string = "";
    numerosIndices: number[] = [];
    defausse: number[] = [];
    machine?: Machine;
    combinable?: Combinable;
}


export class Machine {
    reponse: string = "";
    nouvelleimg: string = "";
    nouvelledescription: string = "";
    choix: string[] = [];
    active: boolean = true;
}

export class Combinable {
    numIndice: number = 0;
    numCombine: number = 0;
    couleur: Couleur = Couleur.bleu;
}


export enum Couleur {
    rouge,
    bleu
}