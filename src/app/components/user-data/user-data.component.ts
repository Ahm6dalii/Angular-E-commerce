import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { FormField } from '../../interfaces/form-field';
import { UserSettingService } from './../../service/user-setting.service';
import { get } from 'http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [ToastModule, RippleModule,ToastModule ,CommonModule, DynamicFormComponent,ReactiveFormsModule,RouterOutlet],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css',
  providers: [MessageService]
})
export class UserDataComponent {
  showErrors: boolean = false
  isLoading: boolean = false
  errorMessage: string = ''

updateForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.minLength(5), Validators.maxLength(10)]),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl('', [Validators.min(12)]),
  })

  constructor(private messageService:MessageService,private _userSettingService:UserSettingService){

  }
updateUserInformation(event: Event) {
    event.preventDefault()
    console.log(this.updateForm);
    if (this.updateForm.valid == false) {
      this.updateForm.markAllAsTouched()
    } else {
      this.isLoading = true
      this.errorMessage = ''
      this._userSettingService.updateUserData(this.updateForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Data updated',
            detail: 'Data updated.'
          });
          console.log(res);
          this.isLoading = false
          this.errorMessage = (res as any).message
        },
        error:()=>{
          this.messageService.add({
            severity: 'error',
            summary: 'failed updated',
            detail: 'failed updated.'
          });
          this.isLoading = false

        }
      })
    }
  }


  get nameControl():FormControl {
    return this.updateForm.get('name') as FormControl;
  }
  get emailControl(): FormControl {
    return this.updateForm.get('email') as FormControl;
  }


get phoneControl(): FormControl {
    return this.updateForm.get('phone') as FormControl;
  }

}
