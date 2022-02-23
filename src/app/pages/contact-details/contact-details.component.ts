import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, pluck, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { Store } from '@ngrx/store';
import { State } from '../../store/store';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  contact$: Observable<Contact | null>;
  contact = { _id: '', email: '', name: '', phone: '' };
  sub: Subscription | null = null;
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private store: Store<State>
  ) {
    this.contact$ = this.store.select('itemState').pipe(pluck('contact'));
  }

  async ngOnInit(): Promise<void> {
    this.sub = this.contact$.subscribe(contact => {
      console.log('Got Item to Edit', contact);
      if (contact) this.contact = JSON.parse(JSON.stringify(contact))
      // else this.saved.emit() // This fails due to Angular behavior (problem with the intial emit)
    })
  }
  ngOnDestroy(): void {}
}
