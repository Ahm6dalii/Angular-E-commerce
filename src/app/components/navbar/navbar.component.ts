import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CardWishService } from '../../service/card-wish.service';
import { AuthTokenService } from '../../service/auth-token.service';
import { ModalComponent } from "../utils/modal/modal.component";
import { UpperCaseStPipe } from '../../pipes/upper-case-st.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ModalComponent,UpperCaseStPipe],
templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
_cardWishService=inject(CardWishService);
cardNum:number=0
wishNum:number=0
isLogedIn:string=''
currentUser:any

constructor(private _authTokenService:AuthTokenService){
}
ngOnInit(): void {
  this.getCardNumber();
  this.getWishNumber();
  this.haveSignIN();
  this.getCurrentUser();
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
logout(){
  this._authTokenService.logout()
}
getCardNumber(){
  this._cardWishService.numOfCartItems.subscribe({
    next:(res)=>{
this.cardNum=res
    }
  })

}
getCurrentUser(){
this._authTokenService.decode$.subscribe({
  next:(res)=>{
this.currentUser=res
console.log(res,'sssssssssssssssssssssssssssssssssssssss');

  },
  error(err){
    console.log(err);
    
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
