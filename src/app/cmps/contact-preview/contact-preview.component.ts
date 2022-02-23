import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'; 
@Component({
  selector: 'app-contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss'],
})
export class ContactPreviewComponent implements OnInit {
  constructor(private router: Router) {}
  @Input() contact: Contact;
  @Output() onSelect = new EventEmitter<string>();
  @Output() onRemove = new EventEmitter<string>();

  goToEdit(ev: Event, contact: Contact) {
    ev.stopPropagation();
    ev.preventDefault();
    // [routerLink]="['edit', contact._id]"
    // this.router.navigateByUrl(`contacts/edit/${contact._id}`);
  }
  ngOnInit(): void {}
}
