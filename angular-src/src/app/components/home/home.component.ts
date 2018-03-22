import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import * as socketIo   from 'socket.io-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scroller') private chatCard: ElementRef;
  chatmessage: String;
  messagefeed: any;
  connection:  any;
  username:    string;
  
  constructor(private chatService: ChatService,
              public  authService: AuthService ) {}

  ngOnInit() {
    if(localStorage.getItem('id_token')){
      this.authService.getProfile().subscribe(profile => {
        this.username = profile.user.username;
        console.log(this.username);
      }, err => {
        console.log(err);
        return false;
      });
    }

    this.messagefeed = this.chatService.getChatMessages();
    this.connection  = this.chatService.getChatObservable().subscribe(data => {
      this.messagefeed = this.chatService.getChatMessages();
    })
  }

  ngAfterViewChecked(){
    this.scrollToBottom();
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  onChatmessageSubmit(){
    if(this.chatmessage && this.chatmessage.length > 0){
      const msg = {
        username: this.username,
        text:     this.chatmessage
      }
      this.chatService.saveChatMessage(msg).subscribe(data => {
        console.log(data);
        this.chatService.emitNewMessageAdded(this.chatmessage);
        this.chatmessage = '';
      });
    }
    else {
      console.log('no message provided');
    }
  }

  scrollToBottom(): void {
    this.chatCard.nativeElement.scrollTop = this.chatCard.nativeElement.scrollHeight;
  }
}
