import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact.model';
import { Observable, pluck, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../store/store';
import {
  LoadContact,
  LoadContacts,
  RemoveContact,
} from 'src/app/store/actions/item.actions';

@Component({
  selector: 'app-bitcoin-app',
  templateUrl: './bitcoin-app.component.html',
  styleUrls: ['./bitcoin-app.component.scss'],
})
export class BitcoinAppComponent implements OnInit {
  contacts$: Observable<Contact[]>;
  contact$: Observable<Contact | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;
  selectedContactId: string;
  filterBy: string = '';
  firstLoad: boolean = false;
  // contactService: any;
  constructor(
    private store: Store<State>,
    private contactService: ContactService
  ) {
    this.contacts$ = this.store.select('itemState').pipe(pluck('contacts'));
    this.contact$ = this.store.select('itemState').pipe(pluck('contact'));
    this.isLoading$ = this.store.select('itemState').pipe(pluck('isLoading'));
    this.error$ = this.store.select('itemState').pipe(pluck('error'));
  }

  ngOnInit(): void {
    // this.contactService.setItems()
    
  }
  onRemoveContact(contactId: string) {
    console.log('itemApp: dispatching remove');
    this.store.dispatch(new RemoveContact(contactId));
  }
  onSelect(itemId: string) {
    console.log('itemApp: dispatching load item (for edit)');
    this.store.dispatch(new LoadContact(itemId));
  }
}
