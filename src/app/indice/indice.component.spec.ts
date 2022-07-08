import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndiceComponent } from './indice.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Indice, Type } from '../indice';
import { MatIconModule } from '@angular/material/icon';


describe('IndiceComponent', () => {
  let component: IndiceComponent;
  let fixture: ComponentFixture<IndiceComponent>;
  let indice: Indice;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatIconModule],
      declarations: [ IndiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndiceComponent);
    component = fixture.componentInstance;
    indice = {
      "id": 0,
      "nom": "Bureau",
      "description": "Voici la pièce où vous êtes enfermés. Plusieurs éléments sont visibles. Vous pouvez maintenant révéler les cinq indices dont vous voyer le numéro. Pour cela entrez chaque numéro que vous voyez dans le champ \"Recherche d'indice\".",
      "img": "bureau.png",
      "numerosIndices": [11, 42, 35, 69, 21],
      "defausse": [],
      "type": Type.lieu
    };
    component.indice = indice;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
