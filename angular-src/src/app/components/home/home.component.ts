import { Component, OnInit } from '@angular/core';
import { ChatService }       from '../../services/chat.service';
import * as socketIo         from 'socket.io-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private url = 'http://localhost:3000';
  chatmessage:   String;
  messagefeed:   any;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    // const socket = socketIo(this.url);
    // socket.on('hello', (data) => console.log(data));
    this.messagefeed = this.chatService.getChatMessages();
  }

  onChatmessageSubmit(){
    const msg = {
      username: 'eye',
      text:     this.chatmessage
    }
    this.chatService.saveChatMessage(msg).subscribe(data => {
      console.log(data);
    });

  }
}
