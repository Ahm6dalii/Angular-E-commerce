import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../interfaces/product';
import { CustomStringPipe } from '../../pipes/custom-string.pipe';
import { CatogerySlideComponent } from "../utils/catogery-slide/catogery-slide.component";
import { HttpClient } from '@angular/common/http';
import { ProductSlideComponent } from "../utils/product-slide/product-slide.component";
import { ProductsComponent } from "../products/products.component";
import { BannerComponent } from "../utils/banner/banner.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CustomStringPipe, CatogerySlideComponent, ProductSlideComponent, ProductsComponent, BannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  catogeries:Product[]=[] ;
  _productService=inject(ProductsService);
// constructor(private  _productService:HttpClient){

// }
ngOnInit(): void {
  this.getCatogeries();
}
getCatogeries(){
  this._productService.getCatogery().subscribe({
    next:(res)=>{
      console.log(res.data);

      this.catogeries=res.data
      
    }
  })
}
}
