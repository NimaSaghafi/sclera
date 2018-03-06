import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http, Headers }   from '@angular/http';
import * as socketio  from 'socket.io-client';

@Injectable()
export class ChatService {
  private url = 'http://localhost:3000';
  private socket;

  constructor(private http:Http){}
 
  saveChatMessage(msg){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/messages', msg, {headers})
            .map(res => res.json());
    //this.socket.broadcast.emit('new-message', msg);
  }

  getChatMessages(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/messages', {headers})
            .map(res => res.json());
  }
}
