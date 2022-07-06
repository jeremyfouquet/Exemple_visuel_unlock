import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Couleur, Indice, Type } from '../indice';

@Component({
  selector: 'app-indice',
  templateUrl: './indice.component.html',
  styleUrls: ['./indice.component.scss']
})
export class IndiceComponent implements OnInit {
  @Input() indice!: Indice;
  @Input() codeForm!: FormGroup;
  @Input() codePlaceholder! : string;
  @Output() erreur = new EventEmitter<number>();
  @Output() combinaison = new EventEmitter<number>();
  @Output() rechercheCode = new EventEmitter();

  // public indice!: Indice;

  public activer: boolean = false;
  public retourne: boolean = false;
  public Type = Type;

  public machineForm: FormGroup = this._formBuilder.group({
    choix: ''
  });

  public combinaisonForm: FormGroup = this._formBuilder.group({
    combinaison: ''
  });

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  public rougeOuBleu(indice: Indice) {
    return indice.combinable?.couleur === Couleur.rouge? 'rouge' : 'bleu';
  }

  public utiliser() {
    this.activer = true;
  }
  public retour() {
    this.machineForm.reset();
    this.activer = false;
  }

  public testerCombinaison() {
    const combinaison = this.combinaisonForm.controls['combinaison'].value;
    const somme = combinaison + this.indice.combinable?.numIndice;
    if (somme === this.indice.combinable?.numCombine) {
      this.combinaison.emit(somme);
    } else {
      this.erreur.emit(60);
    }
    this.combinaisonForm.reset();
  }

  public testerMachine() {
    const choix = this.machineForm.controls['choix'].value;
    if (choix === this.indice.machine?.reponse) {
      this.indice.img = this.indice.machine?.nouvelleimg? this.indice.machine.nouvelleimg : this.indice.img;
      this.indice.description = this.indice.machine?.nouvelledescription? this.indice.machine.nouvelledescription : this.indice.description;
      if (this.indice.machine) {
        this.indice.machine.active = false;
      }
    } else {
      this.erreur.emit(60);
    }
    this.machineForm.reset();
    this.activer = false;
  }

  public enregistreCode(value: number) {
    this.codeForm.controls['code'].setValue(+`${this.codeForm.controls['code'].value ? this.codeForm.controls['code'].value : ''}${value}`);
  }

}
