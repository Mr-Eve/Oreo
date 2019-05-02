import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivateChild {
  constructor(private router: Router) { }
  canActivateChild() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.level === 1) {
      return true;
    }
    return false;
  }
}

@Injectable()
export class UserGuard implements CanActivateChild {
  constructor(private router: Router) { }
  canActivateChild() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      return true;
    }
    return false;
  }
}
