import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { EventEmitter } from '@angular/core';

export class DocumentService {
   
    documentSelectedEvent = new EventEmitter<Document>();

    documents: Document[] = [];

    constructor() {
        this.documents = MOCKDOCUMENTS;
     }
    getDocuments(): Document[] {
        return this.documents.slice();
    }

    getDocument(id: string): Document {
        for (const document of this.documents) {
            if (document.id === id) {
                return document;
            }
        }
        return null;
    }
}