import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  constructor(private router: Router) {}
  @Input() contacts: Contact[];
  @Output() onSelect = new EventEmitter<string>();
  @Output() onRemove = new EventEmitter<string>();

  ngOnInit(): void {}
  remove(itemId: string) {
    console.log('ItemList Emitting removed to Parent');
    this.onRemove.emit(itemId)
  }
  editContact(itemId: string) {
    console.log('ItemList Emitting edited to Parent');
    this.onSelect.emit(itemId)
    this.router.navigate([`contacts/edit/${itemId}`])

  }
}
