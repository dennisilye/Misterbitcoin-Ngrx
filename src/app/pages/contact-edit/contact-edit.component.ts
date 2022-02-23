import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import {  Router } from '@angular/router';
import { Observable, pluck, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../store/store';
import { SaveContact } from 'src/app/store/actions/item.actions';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
})
export class ContactEditComponent implements OnInit , OnDestroy {
  constructor(
    private router: Router,
    private store: Store<State>
  ) {
    this.contact$ = this.store.select('itemState').pipe(pluck('contact'));
  }

  contact$: Observable<Contact | null>;
  contact = { _id: '', email: '', name: '', phone: '' };
  sub: Subscription | null = null;
  ngOnInit(): void {
 
    this.sub = this.contact$.subscribe(contact => {
      console.log('Got Item to Edit', contact);
      if (contact) this.contact = JSON.parse(JSON.stringify(contact))
      // else this.saved.emit() // This fails due to Angular behavior (problem with the intial emit)
    })
  }
  async onSaveContact() {
    this.store.dispatch(new SaveContact(this.contact));
    console.log('Saving: ', this.contact);
    this.router.navigateByUrl('contacts');
  }
  ngOnDestroy(): void {
      this.sub?.unsubscribe()
  }
}
