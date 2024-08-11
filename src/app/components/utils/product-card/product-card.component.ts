import { Component, Input, input, OnInit, NgModule } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { CustomStringPipe } from '../../../pipes/custom-string.pipe';
import { HttpClient } from '@angular/common/http';
import { CardWishService } from '../../../service/card-wish.service';
import { RouterLink } from '@angular/router';
import { ProductsService } from './../../../service/products.service';

import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from "../modal/modal.component";
import { AuthTokenService } from './../../../service/auth-token.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule,InputTextModule, ButtonModule, ToastModule, RippleModule,ToastModule ,CustomStringPipe, RouterLink, DialogModule, ButtonModule, InputTextModule, AvatarModule, FormsModule, ModalComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  providers: [MessageService]

})
export class ProductCardComponent implements OnInit{
  visible: boolean = false;

  card:any=[]
@Input() item:Product={} as Product;
  isLogedIn:string=''
constructor(private messageService:MessageService,private _cardWishServicet:CardWishService ,private _productsService:ProductsService ,private _authTokenService:AuthTokenService){
}
ngOnInit(): void {
// this.getCardProduct()


this.haveSignIN()
console.log(this.isLogedIn,'this.isLogedIn');

}

haveSignIN(){
  this._authTokenService.myToken$.subscribe({
    next:(res)=>{
      this.isLogedIn=res;
    },
    error(err){
      console.log(err);
      
    }
  })
}
// getCardProduct(){
//   this._cardWishServicet.gitCard().subscribe({
//     next:(res)=>{
//       console.log(res);
//       this.card=res;
//     }
//   })
// }
addProdctToCard(id:any){
  this._cardWishServicet.addToCard(id).subscribe({
    next:(res)=>{
      this.messageService.add({
        severity: 'success',
        summary: 'Product Added',
        detail: 'Product has been added to your cart.'
      });
      console.log(res);
      this._cardWishServicet.changeCard(res.numOfCartItems)
      this.card=res;
    }, error:()=>{
      this.messageService.add({
        severity: 'error',
        summary: 'Product Added',
        detail: 'Product has been added to your wish.'
      });
    }
  })
}
addProdctToWish(id:string){
  this._cardWishServicet.addToWish(id).subscribe({
    next:(res)=>{
      this.messageService.add({
        severity: 'success',
        summary: 'Product Added',
        detail: 'Product has been added to your wish.'
      });
      console.log(res);
      this._cardWishServicet.changeWish(res.data.length)
      this.card=res;   
    },
    error:()=>{
      this.messageService.add({
        severity: 'error',
        summary: 'Product Added',
        detail: 'Product has been added to your wish.'
      });
    }
  })
}
removeProdctFromWish(id:string){
  this._cardWishServicet.removerFromWish(id).subscribe({
    next:(res)=>{
      console.log(res);
      this._cardWishServicet.changeWish(res.data.length)
      this.card=res;
      
    }
  })
}


}
