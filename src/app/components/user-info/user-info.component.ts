import { Component } from '@angular/core';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { FormField } from '../../interfaces/form-field';
import { UserSettingService } from './../../service/user-setting.service';
import { get } from 'http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [ToastModule, RippleModule,ToastModule ,CommonModule, DynamicFormComponent,ReactiveFormsModule,RouterOutlet],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
  providers: [MessageService]
})
export class UserInfoComponent  {
  userAddress:any
  showErrors: boolean = false
  isLoading: boolean = false
  errorMessage: string = ''
  updateForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    details: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  })

  constructor(private messageService:MessageService,private _userSettingService:UserSettingService){
this.getUserAddress()
  }
updateUserInformation(event: Event) {
    event.preventDefault()
    console.log(this.updateForm);
    if (this.updateForm.valid == false) {
      this.updateForm.markAllAsTouched()
    } else {
      this.isLoading = true
      this.errorMessage = ''
      this._userSettingService.addUserAddrsss(this.updateForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Address Added',
            detail: 'Address Added.'
          });
          console.log(res);
          this.getUserAddress();
          this.isLoading = false
          this.errorMessage = (res as any).message
        },
        error:()=>{
          this.messageService.add({
            severity: 'error',
            summary: 'Failed  Added',
            detail: 'Failed to add address.'
          });
          this.isLoading = false

        }
      })
    }
  }
getUserAddress() {

      this._userSettingService.getUserAddrsss().subscribe({
        next: (res) => {
          console.log(res.data);
          
       this.userAddress=res.data        },
        error:()=>{
          this.isLoading = false

        }
      })
    
  }
removeUserAddress(id:string) {

      this._userSettingService.removeUserAddrsss(id).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Address Removed',
            detail: 'Address Removed successfuly.'
          });
          console.log(res.data);
          this.getUserAddress()   
      //  this.userAddress=res.data    
       },
        error:()=>{
          this.messageService.add({
            severity: 'error',
            summary: 'failed Removed',
            detail: 'Failed to Removed .'
          });
          this.isLoading = false

        }
      })
    
  }


  get nameControl():FormControl {
    return this.updateForm.get('name') as FormControl;
  }
  get  detailsControl(): FormControl {
    return this.updateForm.get('details') as FormControl;
  }
  get phoneControl(): FormControl {
    return this.updateForm.get('phone') as FormControl;
  }
get cityControl(): FormControl {
    return this.updateForm.get('city') as FormControl;
  }

}
