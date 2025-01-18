import { Component } from '@angular/core';
import { Contact } from '../contact.module';

@Component({
  selector: 'app-contact-detail',
  standalone: false,
  
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {

  // contacts: Contact[] = [
  //   new Contact("1", "R. Kent Jackson",  "jacksonk@byui.edu", "208-496-3771", "images/jacksonk.jpg", null)
  // ];

}
