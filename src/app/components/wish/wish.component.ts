import { Component, OnChanges, OnInit, inject } from '@angular/core';
import { LoadingScreenComponent } from "../loading-screen/loading-screen.component";
import { ProductsService } from './../../service/products.service';
import { CardWishService } from '../../service/card-wish.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-wish',
  standalone: true,
  imports: [ToastModule,LoadingScreenComponent],
templateUrl: './wish.component.html',
  styleUrl: './wish.component.css',
  providers: [MessageService]

})
export class WishComponent implements OnChanges,OnInit {
  wishList:any;
  isloading:boolean=false;
 _cardWishService= inject(CardWishService)
 constructor(private messageService:MessageService){

 }
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
        this.messageService.add({
          severity: 'success',
          summary: 'Product Added',
          detail: 'Product has been added to your card.'
        });
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
    let userConfirmed = confirm("Are you sure you want to proceed?");
      if (userConfirmed) {
        this.isloading=true
        this._cardWishService.removerFromWish(id).subscribe({
          next:(res)=>{
            this.isloading=false;
            this._cardWishService.changeWish(res.data.length)
            this.messageService.add({
              severity: 'success',
              summary: 'Product Remove',
              detail: 'Product has been removed from your wish.'
            });
    
    this.getWishList()      }
    ,error:(err)=>{
      this.isloading=false
    console.log(err);
    
    }
        })
      } else {
        alert("Action canceled.");
      }
 

  }
  
}
