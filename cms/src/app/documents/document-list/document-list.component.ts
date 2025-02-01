import { Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';


@Component({
  selector: 'app-document-list',
  standalone: false,
  
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents = [
    { id: 1, title: 'Document 1', description: 'Description for document 1', url: 'http://example.com/doc1' },
    { id: 2, title: 'Document 2', description: 'Description for document 2', url: 'http://example.com/doc2' },
    { id: 3, title: 'Document 3', description: 'Description for document 3', url: 'http://example.com/doc3' },
    { id: 4, title: 'Document 4', description: 'Description for document 4', url: 'http://example.com/doc4' },
    { id: 5, title: 'Document 5', description: 'Description for document 5', url: 'http://example.com/doc5' }
  ];

  

  onSelectedDocument(document: Document) { 
    this.selectedDocumentEvent.emit(document);
  }
  

}
