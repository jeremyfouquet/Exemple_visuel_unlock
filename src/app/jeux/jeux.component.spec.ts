import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeuxComponent } from './jeux.component';

describe('JeuxComponent', () => {
  let component: JeuxComponent;
  let fixture: ComponentFixture<JeuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JeuxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JeuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(
    'should create', () => {
      expect(component).toBeTruthy();
    }
  );
  it(
    'should return Hello World', () => {

      const result: boolean = enAttente();
      expect(result).toBeTruthy();
      // expect(result).toEqual(true);
      // return this.jeux?.statut !== Statut.enCours;
    }
  );
});
// function enAttente(): boolean {
//   throw new Error('Function not implemented.');
// }

