import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { Indice } from '../indice';
import { Jeux, Statut } from '../jeux';
import { Joueur, Notes } from '../joueur';
import { JeuxService } from '../services/jeux.service';
import { JoueurService } from '../services/joueur.service';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-jeux',
  templateUrl: './jeux.component.html',
  styleUrls: ['./jeux.component.scss']
})
export class JeuxComponent implements OnInit {

  public jeux!: Jeux;
  public joueurConnecte!: Joueur;
  public avatars: string[] = [];
  public isSubmitConnexion: boolean = false;

  public connexionForm: FormGroup = this._formBuilder.group({
    pseudo: ['', [Validators.required]],
    avatar: ['', [Validators.required]]
  });

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

  selectedFile!: ImageSnippet;
  constructor(
    private _formBuilder: FormBuilder,
    private _joueurService: JoueurService,
    private _jeuxService: JeuxService
  ) {
    this._getAvatars().subscribe((avatars: string[]) => {
      this.avatars = avatars;
      this.connexionForm.controls['avatar'].patchValue(this.avatars[0]);
    });
  }

  ngOnInit(): void {
    // this.connexion("SherlockHolmes");
  }

  public connexion() {
    this.isSubmitConnexion = true;
    setTimeout( () => {
      this.isSubmitConnexion = false;
    }, 5000);
    if(this.connexionForm.invalid) return;
    this._joueurService.userConnexion(this.connexionForm.controls['pseudo'].value, this.connexionForm.controls['avatar'].value);
    // console.log(this.connexionForm.controls['pseudo'].value);
    // console.log(this.connexionForm.controls['avatar'].value);
    // console.log('connexion');
    // this.connexionForm.reset();
    // this.connexionForm.controls['avatar'].patchValue(this.avatars[0]);
    return;


  }

  public enAttente() {
    return this.jeux?.statut !== Statut.enCours;
  }

    // this._joueurService.jouer(pseudo).subscribe(
    //   (joueur: Joueur) => {
    //   this.joueurConnecte = joueur;
    // });
    // // const observable0: Observable<Joueur> = this._joueurService.get(pseudo);
    // // const observable1: Observable<Joueur[]> = this._joueurService.getAll();
    // this._jeuxService.getNewJeux().subscribe(
    //   (jeux: Jeux) => {
    //   this.jeux = jeux;
    // });
    // // const requestDataFromMultipleSources = forkJoin([observable0, observable1]);
    // // requestDataFromMultipleSources.subscribe({
    // //   next(responseList) {
    // //     console.log("resp connexion", responseList);
    // //     const joueur: Joueur = responseList[0];
    // //     const equipe: Joueur[] = responseList[1];
    // //     that.joueurConnecte = joueur;
    // //     that.jeux.equipe = equipe;
    // //     that._topChrono();
    // //   },
    // //   error(msg) {
    // //     console.log('error connexion', msg);
    // //   }
    // // });

  // public connexion(pseudo: string) {
  //   if(!pseudo) return;
  //   const that = this;
  //   const observable0: Observable<Joueur> = this._joueurService.get(pseudo);
  //   const observable1: Observable<Joueur[]> = this._joueurService.getAll();
  //   const observable2: Observable<Jeux> = this._jeuxService.getAll();
  //   const requestDataFromMultipleSources = forkJoin([observable0, observable1, observable2]);
  //   requestDataFromMultipleSources.subscribe({
  //     next(responseList) {
  //       console.log("resp connexion", responseList);
  //       const joueur: Joueur = responseList[0];
  //       const equipe: Joueur[] = responseList[1];
  //       const jeux: Jeux = responseList[2];
  //       that.joueurConnecte = joueur;
  //       jeux.equipe = equipe;
  //       that.jeux = jeux;
  //       // console.log("joueur : ", joueur, "\n");
  //       // console.log("equipe : ", equipe, "\n");
  //       // console.log("jeux : ", jeux, "\n");
  //       that.jeux.equipe = equipe;
  //       that._topChrono();
  //     },
  //     error(msg) {
  //       console.log('error connexion', msg);
  //     }
  //   });
  // }

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

  private _getAvatars(): Observable<string[]> {
    return of(['agent1.png', 'agent2.png', 'agent3.jpeg']);
  }

}
