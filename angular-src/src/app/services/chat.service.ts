import { Injectable }      from '@angular/core';
import { Subject }         from 'rxjs/Subject';
import { Observable }      from 'rxjs/Observable';
import { Http, Headers }   from '@angular/http';
import * as socketio       from 'socket.io-client';

@Injectable()
export class ChatService {
  private url = 'http://localhost:3000/messages';
  private socket;
  authToken: any;

  constructor(private http:Http){}
 
  saveChatMessage(msg){
    let headers = new Headers();
    this.authToken = localStorage.getItem('id_token');
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.url, msg, {headers})
            .map(res => res.json());
  }

  getChatMessages(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url, {headers})
            .map(res => res.json());
  }
  
  emitNewMessageAdded(msg){
    this.socket = socketio('/');
    this.socket.emit('new-message-added', msg);
  }

  getChatObservable(){
    let obs = new Observable(observer => {
      this.socket = socketio('/');
      this.socket.on('new-message', data => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    });
    
    return obs;
  }
}
