import { Document } from './document.model';
import { MOCKDOCUMENTS2 } from './MOCKDOCUMENTS2';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class DocumentService {

    documents: Document[] = [];
    maxDocumentId: number;

    documentListChangedEvent = new Subject<Document[]>();

    constructor() {
        this.maxDocumentId = this.getMaxId();
        this.documents = MOCKDOCUMENTS2;
    }
    // getDocuments(): Document[] {
    //     return this.documents.slice();
    // }

    getDocuments() {
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
        const documentsListClone = this.documents.slice(); 
        this.documentListChangedEvent.next(documentsListClone); 
    }

    getMaxId(): number {
        let maxId = 0;
        for (const document of this.documents) {
            const currentId = +document.id;
            if (currentId > maxId) {
                maxId = currentId;
            }
        }
        return maxId;
    }

    addDocument(newDocument: Document) {
        if (!newDocument) {
            return;
        }

        // this.maxDocumentId++;
        const nextId = (this.documents.length > 0) ? Math.max(...this.documents.map(doc => +doc.id)) + 1 : 1;
        newDocument.id = nextId.toString();
        
        this.documents.push(newDocument);

        const documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);

    }

    updateDocument(originalDocument: Document, newDocument: Document) {
        if (!originalDocument || !newDocument) {
            return;         }
    
        const pos = this.documents.indexOf(originalDocument); 
        if (pos < 0) {
            return;         }
    
        newDocument.id = originalDocument.id;
        this.documents[pos] = newDocument; 
        const documentsListClone = this.documents.slice(); 
        this.documentListChangedEvent.next(documentsListClone); 
    }
    
}