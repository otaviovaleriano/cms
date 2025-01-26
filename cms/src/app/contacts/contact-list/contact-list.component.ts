import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.module';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [
    new Contact("1", "R. Kent Jackson",  "jacksonk@byui.edu", "208-496-3771", "images/jacksonk.jpg", null),
    new Contact("2", "Rex Barzee",  "barzeer@byui.edu", "208-496-3768", "images/barzeer.jpg", null)
  ];


  ngOnInit(): void {
  }

  onSelected(contact: Contact) {
    console.log(contact); // Verify the emitted contact object
    this.selectedContactEvent.emit(contact);
  }
}
