import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CardWishService } from '../../service/card-wish.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
_cardWishService=inject(CardWishService);
cardNum:number=0
wishNum:number=0
constructor(){
}
ngOnInit(): void {
  this.getCardNumber();
  this.getWishNumber();
}
getCardNumber(){
  this._cardWishService.numOfCartItems.subscribe({
    next:(res)=>{
this.cardNum=res
    }
  })

}
getWishNumber(){
  this._cardWishService.numOfWishItems.subscribe({
    next:(res)=>{
this.wishNum=res

    }
  })
}
}
