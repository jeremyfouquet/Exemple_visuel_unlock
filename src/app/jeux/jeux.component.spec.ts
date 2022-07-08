import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { Jeux, Statut } from '../jeux';
import { Joueur } from '../joueur';
import { JeuxService } from '../services/jeux.service';
import { JoueurService } from '../services/joueur.service';
import { JeuxComponent } from './jeux.component';

describe('JeuxComponent', () => {
  let component: JeuxComponent;
  let fixture: ComponentFixture<JeuxComponent>;
  let joueurService: JoueurService;
  let jeuxService: JeuxService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatIconModule],
      declarations: [ JeuxComponent ],
      providers: [ JoueurService ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(JeuxComponent);
    component = fixture.componentInstance;
    joueurService = TestBed.inject(JoueurService);
    jeuxService = TestBed.inject(JeuxService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get providers', () => {
    expect(joueurService).toBeTruthy();
  });

  it('should return statue true from jeux', () => {
    const result: boolean = component.enAttente();
    expect(result).toBeTruthy();
  });

  it('should get connected player\' pseudo', fakeAsync(() => {
    const pseudo: string = 'SherlockHolmes';
    const joueur: Joueur = {
      "id": 120,
      "pseudo": "SherlockHolmes",
      "img": "agent1.png",
      "notes": []
    }
    const jeux: Jeux = {
      "id": 1200,
      "nom": "Tutorial",
      "equipe": [],
      "statut": Statut.enCours,
      "chrono": 600,
      "indices": [],
      "deck": [],
      "code": 9372
    }
    expect(component.joueurConnecte).toBeUndefined();
    spyOn(joueurService, 'get').withArgs(pseudo).and.returnValue(of(joueur));
    spyOn(joueurService, 'getAll').and.returnValue(of([joueur]));
    spyOn(jeuxService, 'getAll').and.returnValue(of(jeux));
    component.connexion(pseudo);
    /* Flush any async tasks. */
    flush();
    expect(joueurService.get).toHaveBeenCalledWith(pseudo);
    expect(joueurService.getAll).toHaveBeenCalled();
    expect(jeuxService.getAll).toHaveBeenCalled();
    expect(component.joueurConnecte).toBe(joueur);
    discardPeriodicTasks();
  }));

});

