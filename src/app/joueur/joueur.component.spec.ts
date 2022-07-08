import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Joueur } from '../joueur';
import { JoueurComponent } from './joueur.component';

describe('JoueurComponent', () => {
  let component: JoueurComponent;
  let fixture: ComponentFixture<JoueurComponent>;
  let joueur: Joueur;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoueurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoueurComponent);
    component = fixture.componentInstance;

    joueur = {
      "id": 120,
      "pseudo": "SherlockHolmes",
      "img": "agent1.png",
      "notes": []
    };
    component.joueur = joueur;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
