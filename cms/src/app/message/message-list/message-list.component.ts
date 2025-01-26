import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  standalone: false,
  
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [
    new Message('1', 'Hello World', 'This is the first message', 'John Doe'),
    new Message('2', 'Angular Rocks', 'This is the second message', 'Lula Ladrao'),
    new Message('3', 'TypeScript is Awesome', 'This is the third message', 'Bolsonaro Nojento')
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
