import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { LoadContacts } from 'src/app/store/actions/item.actions';
import { State } from '../../store/store';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor( private store: Store<State>,private userService: UserService) { }
  user: User
  userName: string
  subscription: Subscription
  onSignup() {
    if(!this.userName) return;
    this.userService.signup(this.userName)
    this.userName = ''
  }


  onLogout(){
    this.userService.logout()
    // this.userService.logout().subscribe(user => {this.user=user})

  }


  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.user = user
    })
    console.log('itemApp: dispatching LoadItems => effects');
      this.store.dispatch(new LoadContacts());
  }
  }
