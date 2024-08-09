import { Component, OnChanges, OnInit, inject } from '@angular/core';
import { LoadingScreenComponent } from "../loading-screen/loading-screen.component";
import { ProductsService } from './../../service/products.service';
import { CardWishService } from '../../service/card-wish.service';

@Component({
  selector: 'app-wish',
  standalone: true,
  imports: [LoadingScreenComponent],
templateUrl: './wish.component.html',
  styleUrl: './wish.component.css'
})
export class WishComponent implements OnChanges,OnInit {
  wishList:any;
  isloading:boolean=false;
 _cardWishService= inject(CardWishService)
 ngOnInit(): void {
  this.getWishList()

 }
  ngOnChanges(): void {
    this.getWishList()
  }
  receiveArr(event: string) {
    console.log(event,'evntenetenten');
    
    // this. = event;
  }
  addProdctToCard(id:any){
    console.log(id);
    this._cardWishService.addToCard(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._cardWishService.changeCard(res.numOfCartItems)
        this.removeFromWishList(id)
      }
    })
  }

  getWishList(){
    this._cardWishService.gitWish().subscribe({
      next:(res)=>{
        console.log(res);
        this.wishList=res
      }
    })
  }
  removeFromWishList(id:string){
    this.isloading=true
    this._cardWishService.removerFromWish(id).subscribe({
      next:(res)=>{
        this.isloading=false;
        this._cardWishService.changeWish(res.data.length)
    console.log(res);

this.getWishList()      }
,error:(err)=>{
  this.isloading=false
console.log(err);

}
    })

  }
  
}
