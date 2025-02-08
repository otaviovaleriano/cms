import { Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';


@Component({
  selector: 'app-document-list',
  standalone: false,
  
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() documentSelectedEvent = new EventEmitter<Document>();

  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}
  
  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }  

  onSelectedDocument(document: Document) { 
    console.log(document);
    this.documentService.documentSelectedEvent.emit(document);
  }
  
  

}
