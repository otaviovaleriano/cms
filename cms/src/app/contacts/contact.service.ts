import { Contact } from './contact.module';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { EventEmitter } from '@angular/core';

export class ContactService {

    contactSelectedEvent = new EventEmitter<Contact>();
    
    contacts: Contact[] = [];

    contactChangedEvent = new EventEmitter<Contact[]>();
    
    constructor() {
        this.contacts = MOCKCONTACTS;
    }

    getContacts(): Contact[] {
        return this.contacts.slice();
    }

    getContact(id: string): Contact {
        for (let contact of this.contacts) {
            if (contact.id === id) {
                return contact;
            }
        }
        return null;
    }

    deleteContact(contact: Contact) { 
        if (!contact) {
            return;
         }
         const pos = this.contacts.indexOf(contact);
         if (pos < 0) {
            return;
         }
         this.contacts.splice(pos, 1);
         this.contactChangedEvent.emit(this.contacts.slice());
    }


}