import { Component, Input, input, OnInit, NgModule } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { CustomStringPipe } from '../../../pipes/custom-string.pipe';
import { HttpClient } from '@angular/common/http';
import { CardWishService } from '../../../service/card-wish.service';
import { RouterLink } from '@angular/router';
import { ProductsService } from './../../../service/products.service';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from "../modal/modal.component";
import { AuthTokenService } from './../../../service/auth-token.service';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CustomStringPipe, RouterLink, DialogModule, ButtonModule, InputTextModule, AvatarModule, FormsModule, ModalComponent],
templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit{
  visible: boolean = false;

  card:any=[]
@Input() item:Product={} as Product;
  isLogedIn:string=''
constructor(private _cardWishServicet:CardWishService ,private _productsService:ProductsService ,private _authTokenService:AuthTokenService){
}
ngOnInit(): void {
// this.getCardProduct()


this.haveSignIN()
console.log(this.isLogedIn,'this.isLogedIn');

}

haveSignIN(){
  this. _authTokenService.myToken$.subscribe({
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
  console.log(id);
  this._cardWishServicet.addToCard(id).subscribe({
    next:(res)=>{
      console.log(res);
      this._cardWishServicet.changeCard(res.numOfCartItems)
      this.card=res;
    }
  })
}
addProdctToWish(id:string){
  this._cardWishServicet.addToWish(id).subscribe({
    next:(res)=>{
      console.log(res);
      this._cardWishServicet.changeWish(res.data.length)
      this.card=res;
      
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
