import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { storageService } from './storageService';
import { utilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user$ = new BehaviorSubject({ name: '' });
  public user$ = this._user$.asObservable();
  LOGGEDIN_USER_KEY = 'loggedinUser';

  constructor() {}
  public signup(userName) {
    const newUser: User = { _id: utilService.makeId(), name: userName };
    this._saveUser(newUser);
    this._user$.next(newUser);
  }

  public logout() {
    storageService.post(this.LOGGEDIN_USER_KEY, null);
    this._user$.next({ name: '' });
  }

  public checkLoggedIn() {
    const user = this._getUser();
    return user && !!Object.keys(user).length;
  }

  private _getUser() {
    const user = storageService.query(this.LOGGEDIN_USER_KEY);
    return user;
  }

  private _saveUser(user) {
    storageService.put(this.LOGGEDIN_USER_KEY, user);
  }
  public isAuthenticated(): boolean {
    const user = this._user$.getValue();
    return !!user;
  }
}
