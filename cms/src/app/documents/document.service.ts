import { Document } from './document.model';
import { MOCKDOCUMENTS2 } from './MOCKDOCUMENTS2';
import { EventEmitter } from '@angular/core';

export class DocumentService {
   
    documentSelectedEvent = new EventEmitter<Document>();

    documents: Document[] = [];

    documentChangedEvent = new EventEmitter<Document[]>();

    constructor() {
        this.documents = MOCKDOCUMENTS2;
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

    deleteDocument(document: Document) {
        if (!document) {
           return;
        }
        const pos = this.documents.indexOf(document);
        if (pos < 0) {
           return;
        }
        this.documents.splice(pos, 1);
        this.documentChangedEvent.emit(this.documents.slice());
     }
}