import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { LoadingScreenComponent } from "../loading-screen/loading-screen.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingScreenComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], // تم التعديل هنا
})
export class RegisterComponent {
  msgErr:string=''
  router = inject(Router);
  errorMessege = '';
  islodaing: boolean = false;
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Za-z0-9]{6,8}'),
    ]),
    rePassword: new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Za-z0-9]{6,8}'),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('01[0125][0-9]{8}'),
    ]),
  });

  constructor(private _authService: AuthService) {}

  register() {
    if (this.registerForm.valid == false) {
      this.registerForm.markAllAsTouched();
    } else {
      this.errorMessege = '';
      this.islodaing = true;
      console.log('Form Data:', this.registerForm.value); // طباعة بيانات النموذج
      this._authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.registerForm.reset();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
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
