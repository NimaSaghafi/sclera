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

  constructor(chatservice: ChatService) { }

  ngOnInit() {
    this.msg = this.chatmessage.username+": "+this.chatmessage.text;
  }

}
