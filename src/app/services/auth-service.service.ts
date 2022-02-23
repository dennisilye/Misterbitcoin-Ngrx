import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService implements CanActivate {

  constructor(public userService: UserService, private router: Router) { }

  canActivate(): boolean {
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['signup']);
      return false;
    } else {
      return true;
    }
  }
}
