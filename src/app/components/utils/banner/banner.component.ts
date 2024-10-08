import { NgFor } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ProductsService } from './../../../service/products.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [NgFor],
templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit{
  products: any[] = [];
  
  productsPerPage: number = 4;
  pages: any[] = [];
  
  constructor(private _productsService:ProductsService){
    
  }
  ngOnInit() {
    this.getBranding();
    // this.paginateProducts();
  }
  paginateProducts() {
    const totalProducts = this.products.length;
    const totalPages = Math.ceil(totalProducts / this.productsPerPage);

    this.pages = Array.from({ length: totalPages }, (_, i) => 
      this.products.slice(i * this.productsPerPage, (i + 1) * this.productsPerPage)
    );
  }



  getBranding(){
    this._productsService.getBrannding().subscribe({
      next:(res)=>{
       this.products=res.data
       this.paginateProducts();

        
      }
    })
  }
}
