import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService, User, UserMsg } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  userName!: string;
  room!: string;

  @ViewChild('alert') alert!: ElementRef;

  listOfUsers: User[] = [];
  msgArray: UserMsg[] = [];

  constructor(private chatService: ChatService) {
    // Listens to Users joining
    this.chatService.newUserJoined().subscribe(data => {
      this.msgArray.push(data);
      this.listOfUsers.push({ id: data.id, userName: data.userName })
    });

    // Listens to Users leaving 
    this.chatService.userLeftRoom().subscribe(data => {
      this.msgArray.push(data);
    })

    // Listens to Incoming messages
    this.chatService.newMessageReceived().subscribe(data => {
      this.msgArray.push(data);
    });
  }

  ngOnInit(): void {
    this.userName = this.chatService.getUsername();
  }

  joinRoom(room: string) {
    this.room = room;
    this.chatService.joinRoom(room);
    this.msgArray = [];
    this.animateAlert(`YOU JOINED IN: ${room}`);
  }

  leaveRoom(room: string) {
    this.room = '';
    this.chatService.leaveRoom(room);
    this.msgArray = [];
    this.animateAlert(`YOU LEFT FROM: ${room}`);
  }

  clearChat() {
    this.msgArray = [];
  }

  sendMessage(msg: string) {
    if(msg !== '') {
      this.chatService.sendMessage({ room: this.room, userName: this.userName, message: msg });
    }
  }

  animateAlert(alert: string): void {
    this.alert.nativeElement.innerText = alert;
    this.alert.nativeElement.style.display = 'inline-block';
    setTimeout(() => {
      this.alert.nativeElement.style.display = 'none';
    }, 2000);
  }

}
