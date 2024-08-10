import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../service/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CardWishService } from './../../service/card-wish.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product!:Product
  constructor( private route:ActivatedRoute,private _ProductService:ProductsService
    ,private router:Router,private _cardWishServicet:CardWishService
  ){

  }
  ngOnInit(): void {
    this.getProduct();
  }
  getProduct() {
    const id =String(this.route.snapshot.paramMap.get('id'));
    this._ProductService.getProductById(id).subscribe({
      next:(res)=>{
        this.product=res.data
        console.log(this.product)
      }
    })
    }

    addProdctToCard(id:any){
      console.log(id);
      this._cardWishServicet.addToCard(id).subscribe({
        next:(res)=>{
          console.log(res);
          this._cardWishServicet.changeCard(res.numOfCartItems)
          // this.card=res;
        }
      })
    }
    addProdctToWish(id:string){
      this._cardWishServicet.addToWish(id).subscribe({
        next:(res)=>{
          console.log(res);
          this._cardWishServicet.changeWish(res.data.length)
          // this.card=res;
          
        }
      })
    }
}
