import { Component, inject, OnInit } from '@angular/core';
import { CardWishService } from '../../service/card-wish.service';
import { AuthTokenService } from '../../service/auth-token.service';
import { NgFor, NgIf } from '@angular/common';
import { LoadingScreenComponent } from "../loading-screen/loading-screen.component";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgIf, NgFor, LoadingScreenComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  isRespode:boolean=false;

  OrderList:any=[]
  currentUser:any
  _cardWishService=inject(CardWishService);
  constructor(private _authTokenService:AuthTokenService){
    this.getCurrentUser()
  }
  ngOnInit(): void {
  }
  getCurrentUser(){
    this._authTokenService.decode$.subscribe({
      next:(res)=>{
    this.currentUser=res
    this.getOrderList(res.id)
    console.log(res,'sssssssssssssssssssssssssssssssssssssss');
    
      },
      error(err){
        console.log(err);
        
      }
    })
    }

  getOrderList(id:any){
    this.isRespode=true
    this._cardWishService.gitAllOrder(id).subscribe({
      next:(res)=>{
        this.isRespode=false
        console.log(res,"order");
        this.OrderList=res;
      },error(err){
        this.isRespode=false
        console.log('aaaaaaaaaaaaahhhhhhhhhhhhhh',err);
      }
    })
  }

  formatDate(dateString: string): string {
    // Split the date string and return formatted date
    return dateString.split('T').join(' ').split(/\.[0-9A-Za-z]{0,}/)[0];
  }
}
