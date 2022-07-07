import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Indice } from '../indice';

@Injectable({
  providedIn: 'root'
})
export class IndiceService {

  constructor( private _http: HttpClient) { }

  /**
   * getAll
   */
  public getAll(): Observable<Indice[]> {
    return this._http.get<Indice[]>(environment.indicesApiUrl);
  }
}
