import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthTokenService } from './auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class UserSettingService {
  _authTokenService=inject(AuthTokenService);
  token:any= '';
  isBrowser:boolean=false;
  constructor(@Inject(PLATFORM_ID) platfromId:object,private _httpClient:HttpClient) { 
    this.isBrowser=isPlatformBrowser(platfromId);
    if(this.isBrowser){
      if(localStorage.getItem('token')){
        this.token=JSON.parse(localStorage.getItem('token')||'')
    }
  }
  this._authTokenService.myToken$.subscribe({
    next:(res)=>{
      this.token=res;
      console.log(res,'rrresfdfsdfsdfdsfdfsdfdsfsd');
      
    }
  })
}


updateUserData(data: any): Observable<any> {
  console.log(data);
  
  const headers = new HttpHeaders({
    'token': this.token
  });

  return this._httpClient.put<any>(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`, data , { headers })
}

updateUserPassword(data: any): Observable<any> {
  console.log(data);
  
  const headers = new HttpHeaders({
    'token': this.token
  });
  return this._httpClient.put<any>(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,  data , { headers })
}
addUserAddrsss(data: any): Observable<any> {
  console.log(data);
  
  const headers = new HttpHeaders({
    'token': this.token
  });
  return this._httpClient.post<any>(`https://ecommerce.routemisr.com/api/v1/addresses`,  data , { headers })
}
getUserAddrsss(): Observable<any> {

  const headers = new HttpHeaders({
    'token': this.token
  });
  return this._httpClient.get<any>(`https://ecommerce.routemisr.com/api/v1/addresses`, { headers })
}
removeUserAddrsss(id: any): Observable<any> {
  console.log(id);
  const headers = new HttpHeaders({
    'token': this.token
  });
  return this._httpClient.delete<any>(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, { headers })
}

}