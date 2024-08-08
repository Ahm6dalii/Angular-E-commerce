import { Component, inject, OnInit } from '@angular/core';
import { CardWishService } from '../../service/card-wish.service';
import { CustomStringPipe } from '../../pipes/custom-string.pipe';
import { LoadingScreenComponent } from "../loading-screen/loading-screen.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CustomStringPipe, LoadingScreenComponent,FormsModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit {
  isloading:boolean=false;
  count:number=0
  productList:any=[]
  _cardWishService=inject(CardWishService);
  constructor(private _cardWishServicet:CardWishService){

  }
  ngOnInit(): void {
    this.getCardList()
  }

  getCardList(){
    this._cardWishService.gitCard().subscribe({
      next:(res)=>{
        console.log(res);
        this.productList=res


        
      }
    })
  }
  removeFromCard(id:string){
    this.isloading=true;
    this._cardWishService.removerFromCard(id).subscribe({
      next:(res)=>{
        console.log(res); 
        this._cardWishServicet.changeCard(res.numOfCartItems)
        this.productList=res
        this.isloading=false
this.getCardList()     
      },
      error:(err)=>{
        console.log(err);
        this.isloading=false
      }
    })
  }
  clearCard(){
    this.isloading=true;
    this._cardWishService.clearCard().subscribe({
      next:(res)=>{
        console.log(res); 
        this.productList=['a']
        this.isloading=false
     
      },
      error:(err)=>{
        console.log(err);
        this.isloading=false
      }
    })
  }
  UpdateItemInCard(id:string,data:number){
    console.log(data);
    
    if(data<=1){
      return this.removeFromCard(id)
    }
    this.isloading=true
    this._cardWishService.updateCard(id,data).subscribe({
      next:(res)=>{
        console.log(res);
        this.productList=res
        this.isloading=false
      
      },
      error:(err)=>{
        console.log(err);
        this.isloading=false
      }
    })
    
  }

}


