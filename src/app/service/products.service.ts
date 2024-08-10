
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './../interfaces/product';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrl:string="https://ecommerce.routemisr.com/api/v1";
  products:Product={ } as Product;
  token:any= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjNjOTRlZWQwZGMwMDE2YzEwZjBjZiIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzIzMDk5OTE0LCJleHAiOjE3MzA4NzU5MTR9.7MeEsxNXseN0OYYnwwmA3-bLy9UYl4M2fP8sS6bGLbY";
  myToken:BehaviorSubject<string>= new BehaviorSubject('')
  myToken$=this.myToken.asObservable();
  isBrowser:boolean=false

  constructor(@Inject(PLATFORM_ID) platfromId:object,private _httpClient:HttpClient) { 
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
  }

  getproduct(linkPrams='',start=1,limit=2):Observable<any>{ 
    let s=start;
    let l=limit ;
    console.log(s,l);
  return this._httpClient.get<any>(`https://ecommerce.routemisr.com/api/v1/products?limit=${l}&page=${s}&${linkPrams}`)
  }

  getCatogery():Observable<any>{ 
  return this._httpClient.get<any>(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  getProductById(id:string):Observable<any>{
    return this._httpClient.get<any>(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  getBrannding():Observable<any>{ 
    return this._httpClient.get<any>(`https://ecommerce.routemisr.com/api/v1/brands`)
    }
}
