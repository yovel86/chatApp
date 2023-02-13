import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../chat/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private chatService: ChatService) { }

  ngOnInit(): void {
  }

  joinChat(userName: string) {
    if(userName === '') alert('Please enter your name...');
    else {
      this.chatService.setUserName(userName);
      this.router.navigateByUrl('/chat');
    }
  }

}
