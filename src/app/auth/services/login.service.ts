import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ILogin {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  get isLoggedIn$() {
    return this.loggedIn$.asObservable();
  }

  currentUser = 'Your name';

  login({ username, password }: ILogin): boolean {
    if (username.trim() !== '' && password.trim() !== '') {
      localStorage.setItem('token', 'a2919922-f24a-403d-8909-c6a1680b3b45');
      localStorage.setItem('username', username);
      this.currentUser = username;
      this.loggedIn$.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.currentUser = 'Your name';
    this.loggedIn$.next(false);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
}
