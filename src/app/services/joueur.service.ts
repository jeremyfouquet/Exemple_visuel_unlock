import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this._http.get<Joueur[]>(environment.joueurApiUrl);
  }
}
