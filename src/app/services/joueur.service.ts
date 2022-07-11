import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Joueur } from '../joueur';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class JoueurService {

  public joueur$: BehaviorSubject<Joueur> = new BehaviorSubject(new Joueur());

  private _socket = io(environment.socketUrl);

  constructor(private _http: HttpClient) { }

  public jouer(pseudo: String) {
    this._socket.emit('jouer', pseudo);
    this._socket.on('jouer', (joueur: Joueur) =>{
      console.log('joueur service', joueur);
      this.joueur$.next(joueur);
    });
    return this.joueur$.asObservable();
  };

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
      if (joueur) {
        return joueur
      };
      throw throwError(() => new Error('aucun joueur existant avec ce pseudo'));
    }))
  }
}
