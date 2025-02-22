import { Subject } from 'rxjs';
import { Contact } from './contact.module';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { EventEmitter } from '@angular/core';

export class ContactService {

    maxContactId: number;

    contactListChangedEvent = new Subject<Contact[]>();

    contactSelectedEvent = new Subject<Contact>();

    contacts: Contact[] = [];

    // contactChangedEvent = new EventEmitter<Contact[]>();

    constructor() {
        this.maxContactId = this.getMaxId();
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
        const contactsListClone = this.contacts.slice(); 
        this.contactListChangedEvent.next(contactsListClone); 
    }

    getMaxId(): number {
        let maxId = 0;
        for (const contact of this.contacts) {
            const currentId = +contact.id;
            if (currentId > maxId) {
                maxId = currentId;
            }
        }
        return maxId;
    }

    addContact(newContact: Contact) {
        if (!newContact) {
            return;
        }
        this.maxContactId++;
        newContact.id = this.maxContactId.toString();
        this.contacts.push(newContact);
        const contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);

    }

    updateContact(originalContact: Contact, newContact: Contact) {
        if (!originalContact || !newContact) {
            return;
        }

        const pos = this.contacts.indexOf(originalContact);
        if (pos < 0) {
            return;
        }

        newContact.id = originalContact.id;
        this.contacts[pos] = newContact;
        const contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
    }


}