import { Component } from '@angular/core';
import { FormField } from '../../interfaces/form-field';
import { UserSettingService } from './../../service/user-setting.service';
import { get } from 'http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { CardWishService } from '../../service/card-wish.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink,ToastModule, RippleModule,ToastModule ,CommonModule, DynamicFormComponent,ReactiveFormsModule,RouterOutlet],
templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  providers: [MessageService]
})
export class CheckoutComponent {
  showErrors: boolean = false
  isLoading: boolean = false
  isLoadingCash: boolean = false
  errorMessage: string = ''
  id:any;
  userShippingAddress:any
updateForm: FormGroup = new FormGroup({
  details: new FormControl('',[Validators.required] ),
  phone: new FormControl('', [Validators.required]),
  city: new FormControl('', [Validators.required]),
  })

  constructor(private messageService:MessageService,private _cardWishService:CardWishService, private route:ActivatedRoute
    ,private _userSettingService:UserSettingService,private router: Router
  ){
this.id =String(this.route.snapshot.paramMap.get('id'));
this.getUserAddress()

  }
  getUserAddress() {

    this._userSettingService.getUserAddrsss().subscribe({
      next: (res) => {
        console.log(res.data);
        
     this.userShippingAddress=res.data[0]  },
      error:()=>{
        this.isLoading = false

      }
    })
  
}
checkOutPayment(event: Event,id) {
    event.preventDefault()
    console.log(this.updateForm);
    this.updateForm.markAllAsTouched()

    if (this.updateForm.valid == false) {
      this.updateForm.markAllAsTouched()
    } else {
      this.isLoading = true
      this.errorMessage = ''
      this._cardWishService.checkOut(id,this.updateForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Data updated',
            detail: 'Data updated.'
          });
          console.log(res);
          this.isLoading = false
          this.errorMessage = (res as any).message
          this.autoNavigate(res.session.url)  
        },
        error:(err)=>{
          console.log(err);
          
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
cashPayment(event: Event,id) {
    event.preventDefault()
    console.log(this.updateForm);
    this.updateForm.markAllAsTouched()

    if (this.updateForm.valid == false) {
      this.updateForm.markAllAsTouched()
    } else {
      this.isLoadingCash = true
      this.errorMessage = ''
      this._cardWishService.checkOutCash(id,this.updateForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Data updated',
            detail: 'Data updated.'
          });
          this._cardWishService.changeCard(0)
          console.log(res);
          this.isLoadingCash = false
          this.errorMessage = (res as any).message
          this.router.navigate(['/allorders']);

        },
        error:(err)=>{
          console.log(err);
          
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


  get detailsControl():FormControl {
    return this.updateForm.get('details') as FormControl;
  }
  get cityControl(): FormControl {
    return this.updateForm.get('city') as FormControl;
  }


get phoneControl(): FormControl {
    return this.updateForm.get('phone') as FormControl;
  }


  autoNavigate(url: string) {
    if(typeof window !== undefined ){
      window.location.href = url;
    }
  }
}
