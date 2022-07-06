import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Indice, Type } from '../indice';
import { Jeux, Statut } from '../jeux';
import { Joueur, Notes } from '../joueur';
import { IndiceService } from '../services/indice.service';
import { JeuxService } from '../services/jeux.service';
import { JoueurService } from '../services/joueur.service';

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

  // public codeTeste: boolean = false;
  // public codeErreur: boolean = false;
  public codePlaceholder: string = "Entrez un code";
  public bravo!: string;

  constructor(
    private _formBuilder: FormBuilder,
    private _joueurService: JoueurService,
    private _jeuxService: JeuxService,
    private _indiceService: IndiceService
  ) { }

  ngOnInit(): void {
    this.connexion("SherlockHolmes", "agent1.png");
  }

  public enAttente() {
    return this.jeux?.statut !== Statut.enCours;
  }

  public connexion(pseudo: string, avatar: string) {
    if(!pseudo){return};
    this.joueurConnecte = {
      id: 120,
      pseudo: pseudo,
      img: avatar,
      notes: []
    };

    let equipe: Joueur[];
    this._joueurService.getAll().subscribe(
      ( joueurs: Joueur[] ) => {
        joueurs.push(this.joueurConnecte);
        console.log("joueurs:\n", joueurs);
        equipe = joueurs;
      }
    )
    this._jeuxService.getAll().subscribe(
      ( jeux: Jeux ) => {
        console.log("jeux:\n", jeux);
        jeux.equipe = equipe;
        this.jeux = jeux;
      }
    )
    this._indiceService.getAll().subscribe(
      ( indices: Indice[] ) => {
        console.log("indices:\n", indices);
        this.jeux.indices = indices.filter((x: Indice) => x.type === Type.lieu);
        this.jeux.deck = indices.filter((x: Indice) => x.type != Type.lieu);
      }
    )
    this._topChrono();
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
    // this.codeTeste = true;
    // setTimeout( () => {
    //   this.codeTeste = false;
    // }, 2000);
    if (this.codeForm.invalid) {
      this.codeForm.reset();
      this.codePlaceholder = "Le code doit être à 4 chiffres";
      setTimeout( () => {
        this.codePlaceholder = "Entrez un code";
      }, 2000);
      return;
    }
    const code = this.codeForm.controls['code'].value;
    if (code === this.jeux.code) {
      this.jeux.indices = [];
      this.bravo = this.getChrono(this.jeux.chrono);
    } else {
      // this.codeErreur = true;
      this.codeForm.reset();
      this.codePlaceholder = "Ce n'est pas le bon code";
      setTimeout( () => {
        // this.codeErreur = false;
        this.codePlaceholder = "Entrez un code";
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
      if (this.jeux.chrono > 0 && !this.bravo) this.jeux.chrono--;
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
