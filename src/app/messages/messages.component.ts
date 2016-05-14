import {Component, Input, OnInit} from '@angular/core';
import {AuthService, UserService} from '../shared';
import {MessagesService} from './messages.service';
import {IMessage} from './message';

@Component({
  moduleId: module.id,
  selector: 'app-messages',
  templateUrl: 'messages.component.html',
  styleUrls: ['messages.component.css']
})
export class MessagesComponent implements OnInit {
  @Input() model;
  messageText: string = '';
  messages: IMessage[];

  constructor(
    authService: AuthService, private userService: UserService,
    private messageService: MessagesService) { }

  ngOnInit() {
    this.messageService.getMessages();
    this.messageService.limitedMessages$.subscribe(messages => { this.messages = messages; });
  }

  sendMessage(messageText: string) {
    this.messageService.sendMessage(messageText);
    this.messageText = '';
  }
  
  getDisplayName(message: IMessage) {
    let displayName = this.userService.getDisplayName(message.uid); 
    return displayName ? displayName : message.author;
  }
}
