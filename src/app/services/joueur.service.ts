import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Joueur } from '../joueur';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {

  constructor(private _http: HttpClient) { }

  /**
   * getAll
   */
   public getAll(): Observable<Joueur[]> {
    return this._http.get<Joueur[]>(environment.joueursApiUrl);
  }

  /**
   * get
   */
  public get(pseudo: string): Observable<Joueur> {
    return this.getAll()
    .pipe(
    map((joueurs: Joueur[]) => {
      const joueur = joueurs.filter((x: Joueur) => x.pseudo === pseudo).shift();
      if (joueur) return joueur;
      throw throwError(() => new Error('aucun joueur existant avec ce pseudo'));
    }))
  }
}
