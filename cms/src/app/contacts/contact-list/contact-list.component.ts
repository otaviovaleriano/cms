import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.module';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();
  }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }

  onSelected(contact: Contact) {
    console.log(contact); 
    this.contactService.contactSelectedEvent.emit(contact);
  }

}
