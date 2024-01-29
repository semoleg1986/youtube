import { Component } from '@angular/core';
import {
  FormBuilder, FormControl, Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin, LoginService } from '../../services/login.service';
import { NoticeService } from 'src/app/youtube/services/notice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, this.passwordStrengthValidator]],
  });

  loggedIn = false;

  constructor(
    private authService: LoginService, 
    private router: Router, 
    private formBuilder: FormBuilder,
    private notice: NoticeService,
    ) {}

  length(control: FormControl) {
    if (control.value.trim().length === 0) {
      return {
        lengthError: true,
      };
    }
    return null;
  }

  passwordStrengthValidator(control: FormControl): { [key: string]: boolean } | null {
    const { value } = control;
  
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumbers = /\d/.test(value);
    const hasSpecialCharacters = /[*.!@#$%^&(){}[\]:;<>,.?~_+=|\\/"'-]/.test(value);
  
    const isPasswordValid = hasUpperCase && hasLowerCase && hasNumbers && hasSpecialCharacters && value.length > 8;
  
    return isPasswordValid ? null : { 'passwordStrength': true };
  }
  

  getUsernameError(error: string) {
    return this.loginForm.get('username')?.errors?.[error];
  }

  getPasswordError(error: string) {
    return this.loginForm.get('password')?.errors?.[error];
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.loggedIn = this.authService.login(this.loginForm.value as ILogin);
    if (this.loggedIn) {
      this.router.navigate(['/youtube']);
      this.notice.showSuccess('Successfully logged in!');
    }
  }

  logout(): void {
    this.authService.logout();
    this.loggedIn = false;
  }
}
