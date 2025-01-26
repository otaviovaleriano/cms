import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../contact.module';

@Component({
  selector: 'app-contact-item',
  standalone: false,
  
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent {

 @Input() contact: Contact;
 @Output() selectedContactEvent = new EventEmitter<Contact>();

  onSelected() {
    this.selectedContactEvent.emit();
  }

}
