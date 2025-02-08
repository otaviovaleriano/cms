import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { EventEmitter } from '@angular/core';

export class MessageService {
    
    messageChangedEvent = new EventEmitter<Message[]>();
    
    messages: Message[] = [];

    constructor() { 
        this.messages = MOCKMESSAGES;
    }

    getMessages(): Message[] {
        return this.messages.slice();
    }

    getMessage(id: string): Message {
        return this.messages.find(message => message.id === id);
    }

    addMessage(message: Message) {
        this.messages.push(message);
        this.messageChangedEvent.emit(this.messages.slice());
    }
}