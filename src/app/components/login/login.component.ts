import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { AuthTokenService } from '../../service/auth-token.service';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  router = inject(Router);
  errorMessege = '';
  islodaing: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Za-z0-9]{6,8}'),
    ]),
  });

  constructor(private _authService: AuthService ,private _authTokenService:AuthTokenService) {}

  login() {
    if (this.loginForm.valid == false) {
      this.loginForm.markAllAsTouched();
    } else {
      this.errorMessege = '';
      this.islodaing = true;
      console.log('Form Data:', this.loginForm.value); // طباعة بيانات النموذج
      this._authService.signin(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res,'dddddddddddddddddddddddddddddddddd');
          this._authService.saveUserData(res.token);
          this._authTokenService.changeToken(res.token)
          this.loginForm.reset();

          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error Response:', err);
          this.islodaing = false;
          this.errorMessege = err.error.message;
        },
      });
    }
  }
}
