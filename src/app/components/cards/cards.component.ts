import { Component, inject, OnInit } from '@angular/core';
import { CardWishService } from '../../service/card-wish.service';
import { CustomStringPipe } from '../../pipes/custom-string.pipe';
import { LoadingScreenComponent } from "../loading-screen/loading-screen.component";
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [ ToastModule,CustomStringPipe, LoadingScreenComponent,FormsModule,RouterLink],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
  providers: [MessageService]

})
export class CardsComponent implements OnInit {
  isloading:boolean=false;
  isRespode:boolean=false;
  NoCard:boolean=false
  count:number=0
  productList:any=[]
  _cardWishService=inject(CardWishService);
  constructor(private _cardWishServicet:CardWishService,private messageService:MessageService){

  }
  ngOnInit(): void {
    this.getCardList()
  }

  getCardList(){
    this.isRespode=true
    this._cardWishService.gitCard().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.numOfCartItems===0){   
          this.NoCard=false;
          return 
        }
        this.productList=res
        this.NoCard=true
        this.isRespode=false
      },error(err){
        this.isRespode=false
        console.log('aaaaaaaaaaaaahhhhhhhhhhhhhh',err);
        if(err.statusText=='Not Found')
        {
          this.NoCard=true
        }
  
      }
    })
  }
  removeFromCard(id:string){
    let userConfirmed = confirm("Are you sure you want to proceed?");
    if (userConfirmed) {
      this.isloading=true;
      this._cardWishService.removerFromCard(id).subscribe({
        next:(res)=>{
          this.messageService.add({
            severity: 'success',
            summary: 'Product Removed',
            detail: 'Product has been removerd from your card.'
          });
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
    } else {
      alert("Action canceled.");

    }

   
  }
  clearCard(){
    let userConfirmed = confirm("Are you sure you want to proceed?");
    if (userConfirmed) {
      this.isloading=true;
      // alert("Action confirmed!");
      this._cardWishService.clearCard().subscribe({
        next:(res)=>{
          console.log(res); 
          this.productList=['a']
          this.isloading=false;
          this.NoCard=false
          this._cardWishService.changeCard(0)
          // this.getCardList()
       
        },
        error:(err)=>{
          console.log(err);
          this.isloading=false
        }
      })
    } else {
      alert("Action canceled.");
    }
    
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


