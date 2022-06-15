import { Component, Input, OnInit } from '@angular/core';
import { Joueur } from '../joueur';

@Component({
  selector: 'app-joueur',
  templateUrl: './joueur.component.html',
  styleUrls: ['./joueur.component.scss']
})
export class JoueurComponent implements OnInit {
  @Input() joueur!: Joueur;

  // public joueur!: Joueur;

  constructor() { }

  ngOnInit(): void {
  }

}
