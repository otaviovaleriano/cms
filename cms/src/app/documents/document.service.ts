import { Document } from './document.model';
import { MOCKDOCUMENTS2 } from './MOCKDOCUMENTS2';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DocumentService {

    documents: Document[] = [];
    maxDocumentId: number;
    documentSelectedEvent = new EventEmitter<Document>();
    documentListChangedEvent = new Subject<Document[]>();

    constructor(private http: HttpClient) {
    }

    firebase = 'https://cms-project-6909a-default-rtdb.firebaseio.com/';

    getDocuments() {
        this.http.get<Document[]>(`${this.firebase}/documents.json`)
        .subscribe(

          (documents: Document[]) => {
            this.documents = documents ? documents : []; 
      
            this.maxDocumentId = this.getMaxId();

            this.documents.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

            this.documentListChangedEvent.next(this.documents.slice());
          },
          (error: any) => {
            console.error('Error fetching documents:', error);
          }
        );
      }  

      storeDocuments() {
        const documentJSON = JSON.stringify(this.documents);

        const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

        this.http.put(`${this.firebase}/documents.json`, documentJSON, { headers })
          .subscribe(() => {
            this.documentListChangedEvent.next(this.documents.slice());
          }, (error) => {
            console.error('Error storing documents:', error);
          })
      }

    // getDocuments() {
    //     return this.documents.slice();
    //   }
    

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
        this.storeDocuments();
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

        this.maxDocumentId++;
        newDocument.id = this.maxDocumentId.toString();
        this.documents.push(newDocument);
        this.storeDocuments();
    }

    updateDocument(originalDocument: Document, newDocument: Document) {
        if (!originalDocument || !newDocument) {
            return;         }
    
        const pos = this.documents.indexOf(originalDocument); 
        if (pos < 0) {
            return;         }
    
        newDocument.id = originalDocument.id;
        this.documents[pos] = newDocument; 
        this.storeDocuments();
    }

}