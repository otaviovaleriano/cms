import { Subject } from 'rxjs';
import { Contact } from './contact.module';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class ContactService {

    maxContactId: number;

    contactListChangedEvent = new Subject<Contact[]>();

    contactSelectedEvent = new Subject<Contact>();

    contacts: Contact[] = [];

    // contactChangedEvent = new EventEmitter<Contact[]>();

    private firebase = 'https://cms-project-6909a-default-rtdb.firebaseio.com/contacts.json';

    constructor(private http: HttpClient) {
        this.getContacts();
    }

    getContacts() {
        this.http.get<Contact[]>(this.firebase)
        .subscribe(
          (contacts: Contact[]) => {
            this.contacts = contacts ? contacts : [];
            this.maxContactId = this.getMaxId();

            this.contactListChangedEvent.next(this.contacts.slice());
          },
          (error) => {
            console.error('Error fetching contacts:', error);
          }
        );
      }

    storeContacts() {
        const contactsJSON = JSON.stringify(this.contacts);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
        this.http.put(this.firebase, contactsJSON, { headers })
        .subscribe(
          () => {
            this.contactListChangedEvent.next(this.contacts.slice());
          },
          (error) => {
            console.error('Error storing contacts:', error);
          }
        );
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
        this.storeContacts();
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
        
        const nextId = (this.contacts.length > 0) ? Math.max(...this.contacts.map(doc => +doc.id)) + 1 : 1;
        newContact.id = nextId.toString();

        this.contacts.push(newContact);
        this.storeContacts();

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
        this.storeContacts();
    }


}