import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  standalone: false,
  
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  currentSender: string = 'Otavio Silva';

@ViewChild('subject', {static: true}) subject: ElementRef;
@ViewChild('msgText', {static: true}) msgText: ElementRef;
@Output() addMessageEvent = new EventEmitter<Message>();

onSendMessage() {
  const subjectValue = this.subject.nativeElement.value;
  const msgTextValue = this.msgText.nativeElement.value;
  const newMessage = new Message(null,null, null, null);
  newMessage.id = '1'; 
  newMessage.sender = this.currentSender;
  newMessage.subject = subjectValue;
  newMessage.msgText = msgTextValue;
  this.addMessageEvent.emit(newMessage);
  console.log('New message:', newMessage);
}



onClear() {
  this.subject.nativeElement.value = '';
  this.msgText.nativeElement.value = '';
}

}
