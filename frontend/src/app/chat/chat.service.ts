import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import * as io from 'socket.io-client';

export interface User {
  id: string,
  userName: string
}
export interface UserMsg {
  id: string,
  userName: string,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  userName!: string;

  private socket = io.io('http://localhost:8100');

  constructor() { }

  setUserName(userName: string): void {
    this.userName = userName.charAt(0).toUpperCase() + userName.slice(1);
  }

  getUsername(): string {
    return this.userName;
  }

  joinRoom(room: string) {
    this.socket.emit('join-room', { userName: this.userName, room });
  }

  leaveRoom(room: string) {
    this.socket.emit('leave-room', { userName: this.userName, room });
  }

  newUserJoined() {
    const userObservable = new Observable<UserMsg>(observer => {
      this.socket.on('new-user-joined', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect() }
    })
    return userObservable;
  }

  userLeftRoom() {
    const userObservable = new Observable<UserMsg>(observer => {
      this.socket.on('user-left-room', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect() }
    })
    return userObservable;
  }

  sendMessage(data: any) {
    this.socket.emit('send-message', data);
  }

  newMessageReceived() {
    const userObservable = new Observable<UserMsg>(observer => {
      this.socket.on('new-message', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect() }
    })
    return userObservable;
  }

}
