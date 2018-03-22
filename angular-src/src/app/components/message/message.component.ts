import { Component, OnInit, Input } from '@angular/core';
import { ChatService }       from '../../services/chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatmessage: any;
  msg:      string;
  username: string;
  text:     string;
  color:    string;

  constructor(chatservice: ChatService) { }

  ngOnInit() {
    this.username = this.chatmessage.username;
    this.text     = this.chatmessage.text;
    this.color    = this.intToRGB(this.hashCode(this.username));
  }

  hashCode(str) { 
      var hash = 0;
      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return hash;
  } 

  intToRGB(i){
      var c = (i & 0x00FFFFFF)
          .toString(16)
          .toUpperCase();

      return "00000".substring(0, 6 - c.length) + c;
  }
}
