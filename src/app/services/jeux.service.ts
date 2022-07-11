import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Jeux } from '../jeux';

@Injectable({
  providedIn: 'root'
})
export class JeuxService {

  constructor(
    private _http: HttpClient
  ) {
  }

  /**
  * getAll
  */
  public getAll(): Observable<Jeux> {
    return this._http.get<Jeux>(environment.jeuxApiUrl);
  }
}
