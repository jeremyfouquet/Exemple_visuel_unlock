export abstract class Indice {
    id: number = 0;
    nom: string = "";
    description: string = "";
    img: string = "";
    numerosIndices: number[] = [];
    defausse: number[] = [];
    type: Type = Type.simple;
    machine?: Machine;
    combinable?: Combinable;
}

export class Machine {
    reponse: string = "";
    nouvelleimg: string = "";
    nouvelledescription: string = "";
    choix: string[] = [];
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

export enum Type {
    lieu,
    simple,
    combinable,
    machine,
    code
}
export const INDICE_TYPE: string[] = [
    "lieu",

]
// mock d'indice
export const INDICE_LIST: Indice[] = [
    {
        id: 0,
        nom: "Bureau",
        description: "Voici la pièce où vous êtes enfermés. Plusieurs éléments sont visibles. Vous pouvez maintenant révéler les cinq indices dont vous voyer le numéro. Pour cela entrez chaque numéro que vous voyez dans le champ \"Recherche d'indice\".",
        img: "assets/bureau.png",
        numerosIndices: [11, 42, 35, 69, 21],
        defausse: [],
        type: Type.lieu
    },
    {
        id: 11,
        nom: "Une Clé",
        description: "Vous pouvez combiner cet objet avec un objet rouge. Pour cela entrez dans le champ \"Combiner\" de la carte le numéro de l'objet avec lequel vous souhaitez le combiner. Mais attention, si ce n'est pas le bon objet vous aurez une pénalité!",
        img: "assets/cle.png",
        numerosIndices: [],
        defausse: [],
        type: Type.combinable,
        combinable: {
            numIndice: 11,
            numCombine: 46,
            couleur: Couleur.bleu
        }
    },
    {
        id: 21,
        nom: "La Porte de sortie",
        description: "Elle est commandée par un digicode. Pour sortir et terminer le tutoriel, vous devez entrer un code à 4 chiffres à l'aide du digicode ci-dessous. Cherchez dans la pièce.",
        img: "assets/porte.png",
        defausse: [],
        numerosIndices: [],
        type: Type.code
    },
    {
        id: 35,
        nom: "Un coffre",
        description: "Il est fermé à clé. Vous pouvez combiner cet objet avec un objet bleu. Pour cela entrez dans le champ \"Combiner\" de la carte le numéro de l'objet avec lequel vous souhaitez le combiner. Mais attention, si ce n'est pas le bon objet vous aurez une pénalité!",
        img: "assets/coffre.png",
        numerosIndices: [],
        defausse: [],
        type: Type.combinable,
        combinable: {
          numIndice: 35,
          numCombine: 46,
          couleur: Couleur.rouge
        }
    },
    {
        id: 42,
        nom: "Un écran",
        description: "Il n'y a pas de courant. Vous pouvez combiner cet objet avec un objet bleu. Pour cela entrez dans le champ \"Combiner\" de la carte le numéro de l'objet avec lequel vous souhaitez le combiner. Mais attention, si ce n'est pas le bon objet vous aurez une pénalité!",
        img: "assets/ecran.png",
        defausse: [],
        numerosIndices: [],
        type: Type.combinable,
        combinable: {
          numIndice: 42,
          numCombine: 48,
          couleur: Couleur.rouge
        }
    },
    {
        id: 69,
        nom: "Une grille",
        description: "Une grille avec des picos séparés de 5 cm. Ceci est une Machine. Avant de cliquer sur le bouton \"Utiliser\" vous devez trouver des indices sur son fonctionnement dans la pièce.",
        img: "assets/grille.png",
        defausse: [],
        numerosIndices: [],
        type: Type.machine,
        machine: {
            reponse: "assets/choix3.png",
            nouvelleimg: "assets/numero9.png",
            nouvelledescription: "Bravo vous avez activé la machine. Vous pouvez combiner ce numéro rouge avec l'objet qui vous a servie à activé la machine.",
            choix: ["assets/choix1.png", "assets/choix2.png", "assets/choix3.png"]
            // , active: true
        }
    },
    {
        id: 46,
        nom: "Un coffre",
        description: "Trés bien. Le coffre est ouvert. Regardez bien l'image. Il y a DEUX éléments intéréssants. Si vous voyez un numéro, utilisez le champ \"Recherche d'indice\" pour révéler l'indice.",
        img: "assets/coffre2.png",
        numerosIndices: [16],
        defausse: [11, 35],
        type: Type.simple
    },
    {
        id: 16,
        nom: "Un fil",
        description: "Un fil éléctrique de 10 cm avec des embouts en forme d'anneaux. Vous pouvez combiner cet objet avec un objet rouge. Pour cela entrez dans le champ \"Combiner\" de la carte le numéro de l'objet avec lequel vous souhaitez le combiner. Mais attention, si ce n'est pas le bon objet vous aurez une pénalité!",
        img: "assets/fil.png",
        numerosIndices: [],
        defausse: [],
        type: Type.combinable,
        combinable: {
          numIndice: 16,
          numCombine: 25,
          couleur: Couleur.bleu
        }
    },
    {
        id: 25,
        nom: "Courant éléctrique",
        description: "Bravo. Vous avez rétabli le courant en plaçant le fil sur la machine. Vous pouvez combiner le numéro affiché en bleu avec un numéro rouge. Pour cela entrez dans le champ \"Combiner\" de la carte le numéro de l'objet avec lequel vous souhaitez combiner ce numéro. Mais attention, si ce n'est pas le bon objet vous aurez une pénalité!",
        img: "assets/courant.png",
        numerosIndices: [],
        defausse: [16, 46, 69],
        type: Type.combinable,
        combinable: {
          numIndice: 6,
          numCombine: 48,
          couleur: Couleur.bleu
        }
    },
    {
        id: 48,
        nom: "Un écran",
        description: "Bien joué. L'écran est allumé. Cela doit servir pour sortir. Vous pouvez entrer un code dans le champ \"Code\" grâce à ces 4 chiffres.",
        img: "assets/ecran2.png",
        numerosIndices: [],
        defausse: [25, 42],
        type: Type.simple
    }
]