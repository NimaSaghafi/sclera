import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as socketio  from 'socket.io-client';

@Injectable()
export class ChatService {
  private url = 'http://localhost:3000';
  private socket;

  constructor(){}
 
  sendMessage(msg){
    this.socket.emit('add-message', msg);
  }


}
