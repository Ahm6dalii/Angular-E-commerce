import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthTokenService } from './auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class CardWishService {

  // token:any= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjNjOTRlZWQwZGMwMDE2YzEwZjBjZiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIzMDk5OTE0LCJleHAiOjE3MzA4NzU5MTR9.7MeEsxNXseN0OYYnwwmA3-bLy9UYl4M2fP8sS6bGLbY";
  token:any= '';
  isBrowser:boolean=false;
  _authTokenService=inject(AuthTokenService);
  private dataCard = new BehaviorSubject<number>(0);
  private dataWish = new BehaviorSubject<number>(0);
  private AllDataCard = new BehaviorSubject<any>(0);
    numOfCartItems= this.dataCard.asObservable();
    numOfWishItems= this.dataWish.asObservable();
    AllDataCard$= this.dataWish.asObservable();

    constructor(@Inject(PLATFORM_ID) platfromId:object,private _httpClient:HttpClient)  { 
      this.isBrowser=isPlatformBrowser(platfromId)
    if(this.isBrowser){
      if(localStorage.getItem('token')){
        this.token=JSON.parse(localStorage.getItem('token')||'')
    }
    }
    //   console.log("assdsfaasssdas");
    this._authTokenService.myToken$.subscribe({
      next:(res)=>{
        this.token=res;
        console.log(res,'rrresfdfsdfsdfdsfdfsdfdsfsd');
        
      }
    })
    if(this.token){
      // this.gitCard().subscribe({
      //   next:(res)=>{
      //     console.log(res.numOfCartItems);     
      //     this.changeCard(res.numOfCartItems)
      //   }
      // })
      // this.gitWish().subscribe({
      //   next:(res)=>{
      //     console.log(res.count,"res.numOfWishItems");       
      //     this.changeWish(res.count)
      //   }
    //   }
    // )
    }
     


  }
 
  
  
  changeCard(data:number) { 
      this.dataCard.next(data);
  }
  changeWish(data:number) {
    this.dataWish.next(data);
  }
  gitCard():Observable<any>{ 
    const headers = new HttpHeaders({
      'token': `${this.token}`,
      'Content-Type': 'application/json'
    });
  
    return this._httpClient.get<any>(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
  }

  addToCard(id: any):Observable<any>{ 
    const headers = new HttpHeaders({
      'token': `${this.token}`,
      'Content-Type': 'application/json'
    });
    console.log(headers,'ssdsdsadsdsad');
    
    const body = {
      "productId": id
    };
  return this._httpClient.post<any>('https://ecommerce.routemisr.com/api/v1/cart',body,{headers})
  }

  updateCard( id: any,data:number):Observable<any>{ 
    const headers = new HttpHeaders({
      'token': `${this.token}`,
      'Content-Type': 'application/json'
    });
    const body = {
      "count":`${data}`
    };
  return this._httpClient.put<any>(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,body,{headers})
  }

  removerFromCard(id:any):Observable<any>{ 
    const headers = new HttpHeaders({
      'token': `${this.token}`,
      'Content-Type': 'application/json'
    });
  return this._httpClient.delete<any>(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers})
  }

  clearCard():Observable<any>{ 
    const headers = new HttpHeaders({
      'token': `${this.token}`,
      'Content-Type': 'application/json'
    });
  return this._httpClient.delete<any>(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
  }
  
  gitWish():Observable<any>{ 
    const headers = new HttpHeaders({
      'token': `${this.token}`,
      'Content-Type': 'application/json'
    });
  
    return this._httpClient.get<any>(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
  }
  addToWish(id:string):Observable<any>{ 
    const headers = new HttpHeaders({
      'token': `${this.token}`,
      'Content-Type': 'application/json'
    });
    const body = {
      "productId": id
    };
    return this._httpClient.post<any>(`https://ecommerce.routemisr.com/api/v1/wishlist`,body,{headers})
  }
  
  removerFromWish(id:any):Observable<any>{ 
    const headers = new HttpHeaders({
      'token': `${this.token}`,
      'Content-Type': 'application/json'
    });
  return this._httpClient.delete<any>(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers})
  }

}
