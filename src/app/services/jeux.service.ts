import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Jeux } from '../jeux';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class JeuxService {

  public jeux$: BehaviorSubject<Jeux> = new BehaviorSubject(new Jeux());

  private _socket = io(environment.socketUrl);

  constructor(
    private _http: HttpClient
  ) {
  }

  public getNewJeux(): Observable<Jeux> {
    this._socket.emit('jeux');
    this._socket.on('jeux', (jeux: Jeux) =>{
      console.log('jeux service', jeux);
      this.jeux$.next(jeux);
    });
    return this.jeux$.asObservable();
  };

  /**
  * getAll
  */
  public getAll(): Observable<Jeux> {
    return this._http.get<Jeux>(environment.jeuxApiUrl);
  }

}
