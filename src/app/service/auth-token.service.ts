import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  token:any= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjNjOTRlZWQwZGMwMDE2YzEwZjBjZiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIzMDk5OTE0LCJleHAiOjE3MzA4NzU5MTR9.7MeEsxNXseN0OYYnwwmA3-bLy9UYl4M2fP8sS6bGLbY";
  myToken:BehaviorSubject<string>= new BehaviorSubject('')
  decode:BehaviorSubject<object>= new BehaviorSubject({})
  myToken$=this.myToken.asObservable();
  decode$=this.decode.asObservable();
  isBrowser:boolean=false

  constructor(@Inject(PLATFORM_ID) platfromId:object,private router:Router) { 
    // this.isBrowser=isPlatformBrowser(platfromId)
    // if(this.isBrowser){
    //   if(localStorage.getItem('token')){
    //     this.token=JSON.parse(localStorage.getItem('token')||'')
    // }
    // }
    this.changeToken('');
  }
  
  changeToken(tokenSt:string){
    this.myToken.next(tokenSt);
     this.decode.next(jwtDecode(this.token))
  }

  logout(){
    if(this.isBrowser) localStorage.removeItem('token')
      this.myToken.next('');
    this.router.navigate(['/login'])
    }
}
