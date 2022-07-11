import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Jeux } from '../jeux';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class JeuxService {
  private socket: any;
  private readonly uri: string = environment.socketUrl;

  constructor(
    private _http: HttpClient
  ) {
    this.socket = io(this.uri);
  }

  /**
  * getAll
  */
  public getAll(): Observable<Jeux> {
    return this._http.get<Jeux>(environment.jeuxApiUrl);
  }
  public listen(): Observable<Jeux> {
    return new Observable((subscriber) => {
      this.socket.on('jeux', (jeux: Jeux) => {
        // console.log('socket jeux : ', jeux);
        subscriber.next(jeux);
      });
    });
  }
  public emit(eventName: string, data: Jeux) {
    this.socket.emit(eventName, data);
  }
}
