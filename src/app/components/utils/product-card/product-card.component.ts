import { Component, Input, input, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { CustomStringPipe } from '../../../pipes/custom-string.pipe';
import { HttpClient } from '@angular/common/http';
import { CardWishService } from '../../../service/card-wish.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CustomStringPipe,RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit{
  card:any=[]
@Input() item:Product={} as Product;
constructor(private _cardWishServicet:CardWishService){

}
ngOnInit(): void {
// this.getCardProduct()
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
