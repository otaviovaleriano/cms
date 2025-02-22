import { Component, OnDestroy } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subject, Subscription } from 'rxjs';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-document-list',
  standalone: false,

  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  // @Output() documentSelectedEvent = new EventEmitter<Document>();
  @Output() documentListChangedEvent = new Subject<Document>();

  documents: Document[] = [];

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documentsList: Document[]) => {
        this.documents = documentsList;
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
