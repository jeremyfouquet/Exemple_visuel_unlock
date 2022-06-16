import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Couleur, Indice, Machine } from '../indice';
import { Jeux, Statut } from '../jeux';
import { Joueur, Notes } from '../joueur';

@Component({
  selector: 'app-jeux',
  templateUrl: './jeux.component.html',
  styleUrls: ['./jeux.component.scss']
})
export class JeuxComponent implements OnInit {

  public jeux!: Jeux;
  public joueurConnecte!: Joueur;

  public indiceForm: FormGroup = this._formBuilder.group({
    indice: ''
  });

  public codeForm: FormGroup = this._formBuilder.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]]
  });

  public chatForm: FormGroup = this._formBuilder.group({
    message: ''
  });

  public codeTeste: boolean = false;
  public codeErreur: boolean = false;
  public bravo!: string;

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.connexion("Sol");
  }

  public enAttente() {
    return this.jeux?.statut !== Statut.enCours;
  }

  public connexion(pseudo: string) {
    if(!pseudo){return};
    this.joueurConnecte = {
      id: 0,
      pseudo: pseudo,
      img: "assets/agent1.png",
      notes: []
    };
    const lieu: Indice = {
      id: 0,
      nom: "Bureau",
      description: "Voici la pièce où vous êtes enfermés. Plusieurs éléments sont visibles. Vous pouvez maintenant révéler les cinq indices dont vous voyer le numéro. Pour cela entrez chaque numéro que vous voyez dans le champ \"Recherche d'indice\".",
      img: "assets/bureau.png",
      numerosIndices: [11, 42, 35, 69, 21],
      defausse: []
    }
    const cle: Indice = {
      id: 11,
      nom: "Une Clé",
      description: "Vous pouvez combiner cet objet avec un objet rouge. Pour cela entrez dans le champ \"Combiner\" de la carte le numéro de l'objet avec lequel vous souhaitez le combiner. Mais attention, si ce n'est pas le bon objet vous aurez une pénalité!",
      img: "assets/cle.png",
      numerosIndices: [],
      defausse: [],
      combinable: {
        numIndice: 11,
        numCombine: 46,
        couleur: Couleur.bleu
      }
    }
    const porte: Indice = {
      id: 21,
      nom: "La Porte de sortie",
      description: "Elle est commandée par un digicode. Pour sortir et terminer le tutoriel, vous devez entrer un code à 4 chiffres dans le champ \"Code\". Cherchez dans la pièce.",
      img: "assets/porte.png",
      defausse: [],
      numerosIndices: []
    }
    const coffre: Indice = {
      id: 35,
      nom: "Un coffre",
      description: "Il est fermé à clé. Vous pouvez combiner cet objet avec un objet bleu. Pour cela entrez dans le champ \"Combiner\" de la carte le numéro de l'objet avec lequel vous souhaitez le combiner. Mais attention, si ce n'est pas le bon objet vous aurez une pénalité!",
      img: "assets/coffre.png",
      numerosIndices: [],
      defausse: [],
      combinable: {
        numIndice: 35,
        numCombine: 46,
        couleur: Couleur.rouge
      }
    }
    const ecran: Indice = {
      id: 42,
      nom: "Un écran",
      description: "Il n'y a pas de courant. Vous pouvez combiner cet objet avec un objet bleu. Pour cela entrez dans le champ \"Combiner\" de la carte le numéro de l'objet avec lequel vous souhaitez le combiner. Mais attention, si ce n'est pas le bon objet vous aurez une pénalité!",
      img: "assets/ecran.png",
      defausse: [],
      numerosIndices: [],
      combinable: {
        numIndice: 42,
        numCombine: 48,
        couleur: Couleur.rouge
      }
    }
    const machine: Machine = {
      reponse: "assets/choix3.png",
      nouvelleimg: "assets/numero9.png",
      nouvelledescription: "Bravo vous avez activé la machine. Vous pouvez combiner ce numéro rouge avec l'objet qui vous a servie à activé la machine.",
      choix: ["assets/choix1.png", "assets/choix2.png", "assets/choix3.png"],
      active: true
    }
    const grille: Indice = {
      id: 69,
      nom: "Une grille",
      description: "Une grille avec des picos séparés de 5 cm. Ceci est une Machine. Avant de cliquer sur le bouton \"Utiliser\" vous devez trouver des indices sur son fonctionnement dans la pièce.",
      img: "assets/grille.png",
      defausse: [],
      numerosIndices: [],
      machine: machine
    }
    const coffre2: Indice = {
      id: 46,
      nom: "Un coffre",
      description: "Trés bien. Le coffre est ouvert. Regardez bien l'image. Il y a DEUX éléments intéréssants. Si vous voyez un numéro, utilisez le champ \"Recherche d'indice\" pour révéler l'indice.",
      img: "assets/coffre2.png",
      numerosIndices: [16],
      defausse: [11, 35]
    }
    const fil: Indice = {
      id: 16,
      nom: "Un fil",
      description: "Un fil éléctrique de 10 cm avec des embouts en forme d'anneaux. Vous pouvez combiner cet objet avec un objet rouge. Pour cela entrez dans le champ \"Combiner\" de la carte le numéro de l'objet avec lequel vous souhaitez le combiner. Mais attention, si ce n'est pas le bon objet vous aurez une pénalité!",
      img: "assets/fil.png",
      numerosIndices: [],
      defausse: [],
      combinable: {
        numIndice: 16,
        numCombine: 25,
        couleur: Couleur.bleu
      }
    }
    const courant: Indice = {
      id: 25,
      nom: "Courant éléctrique",
      description: "Bravo. Vous avez rétabli le courant en plaçant le fil sur la machine. Vous pouvez combiner le numéro affiché en bleu avec un numéro rouge. Pour cela entrez dans le champ \"Combiner\" de la carte le numéro de l'objet avec lequel vous souhaitez combiner ce numéro. Mais attention, si ce n'est pas le bon objet vous aurez une pénalité!",
      img: "assets/courant.png",
      numerosIndices: [],
      defausse: [16, 46, 69],
      combinable: {
        numIndice: 6,
        numCombine: 48,
        couleur: Couleur.bleu
      }
    }
    const ecran2: Indice = {
      id: 48,
      nom: "Un écran",
      description: "Bien joué. L'écran est allumé. Cela doit servir pour sortir. Vous pouvez entrer un code dans le champ \"Code\" grâce à ces 4 chiffres.",
      img: "assets/ecran2.png",
      numerosIndices: [],
      defausse: [25, 42]
    }
    this.jeux = {
      id: 0,
      nom: "Tutorial",
      equipe: [this.joueurConnecte],
      statut: Statut.enCours,
      chrono: 600,
      indices: [lieu],
      deck: [cle, porte, coffre, ecran, grille, coffre2, fil, courant, ecran2],
      code: 9372
    }
    this._topChrono();
    // joueur.maClass();
    // this.jeu.maClass();
  }

  //https://askcodez.com/comment-convertir-les-secondes-en-minutes-et-heures-en-javascript.html
  public getChrono(d: number): string {
    d = Number(d);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var mDisplay = m;
    var sDisplay = s;
    return mDisplay+':'+sDisplay;
  }

  public rechercheIndice() {
    const indice = this.indiceForm.controls['indice'].value;
    if (this._verifierIndice(indice)) {
      this._ajouterIndice(this.jeux.deck.find((x: Indice) => x.id === indice)?.id);
    } else {
      this._penalite(60);
    }
    this.indiceForm.reset();
  }

  public rechercheCode() {
    this.codeTeste = true;
    setTimeout( () => {
      this.codeTeste = false;
    }, 2000);
    if (this.codeForm.invalid) {
      return;
    }
    const code = this.codeForm.controls['code'].value;
    if (code === this.jeux.code) {
      this.jeux.indices = [];
      this.bravo = this.getChrono(this.jeux.chrono);
    } else {
      this.codeErreur = true;
      setTimeout( () => {
        this.codeErreur = false;
        this.codeForm.reset();
      }, 2000);
      this._penalite(60);
    }
  }

  public enregistreCode(value: number) {
    this.codeForm.controls['code'].setValue(+`${this.codeForm.controls['code'].value ? this.codeForm.controls['code'].value : ''}${value}`);
  }

  public erreurIndice(value: number) {
    this._penalite(value);
  }

  public ajouterIndice(value: number) {
    this._ajouterIndice(value);
  }
  public envoiMessage() {
    const message = this.chatForm.controls['message'].value;
    const date = new Date().getTime();
    const note: Notes = {
      message: message,
      date: date
    }
    this.joueurConnecte.notes.push(note);
    this.chatForm.reset();
  }

  private _verifierIndice(indiceRecherche: number): boolean {
    let trouve = false;
    this.jeux.indices.forEach((indice: Indice) => {
      if (indice.numerosIndices.includes(indiceRecherche)) {
        trouve = true;
      }
    });
    return trouve;
  }

  private _topChrono() {
    setInterval(() => {
      if (this.jeux.chrono > 0) this.jeux.chrono--;
    }, 1000);
  }

  private _penalite(temps: number) {
    if (this.jeux.chrono-temps < 0) {
      this.jeux.chrono = 0;
    } else {
      this.jeux.chrono-=temps;
    }
  }

  private _ajouterIndice(numeroIndice: number | undefined) {
    if (numeroIndice !== undefined && this.jeux.deck.find((x: Indice) => x.id === numeroIndice)) {
      this.jeux.deck.forEach((x: Indice) => {
        if (x.id === numeroIndice) {
          this._defausser(x);
          this.jeux.indices.push(x);
        }
      });
      this.jeux.deck = this.jeux.deck.filter((x: Indice) => x.id !== numeroIndice);
    };
  }

  private _defausser(indice: Indice) {
    indice.defausse.forEach((x:number) => {
      this.jeux.indices = this.jeux.indices.filter((y: Indice) => y.id !== x);
    })
  }

}
