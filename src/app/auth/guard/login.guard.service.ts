import { Injectable, inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardService {
  constructor(public auth: LoginService, public router: Router) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['youtube']);
      return false;
    }
    return true;
  }
}

export const LoginGuardGuard: CanActivateFn = () => inject(LoginGuardService).canActivate();
