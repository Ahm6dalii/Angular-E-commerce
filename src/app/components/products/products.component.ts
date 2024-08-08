import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CustomStringPipe } from '../../pipes/custom-string.pipe';
import { Metadata, Product } from '../../interfaces/product';
import { ProductsService } from '../../service/products.service';
import { ProductCardComponent } from "../utils/product-card/product-card.component";
import { LoadingScreenComponent } from "../loading-screen/loading-screen.component";
import { FormsModule } from '@angular/forms';
import { RangeLoopPipe } from '../../pipes/range-loop.pipe';
import { NgClass, NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PramsStringPipe } from '../../pipes/prams-string.pipe';
import { ProductSlideComponent } from "../utils/product-slide/product-slide.component";
import { CatogerySlideComponent } from "../utils/catogery-slide/catogery-slide.component";
import { ProductsOnlyComponent } from '../products-only/products-only.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductsOnlyComponent,PramsStringPipe, NgClass, RouterLink, RouterLinkActive, ProductCardComponent, NgFor, RangeLoopPipe, LoadingScreenComponent, FormsModule, ProductSlideComponent, CatogerySlideComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  searchValue:string='';
  copyArr:Product[]=[]
  _productService=inject(ProductsService)
  products:Product[]=[] ;

  metaData:Metadata={} as Metadata
ngOnInit(): void {
  this.getAllProduct();
}

getAllProduct(linkPrams='',start:number=1,limit:number=8){
  this.products=[];
  this._productService.getproduct(linkPrams,start,limit).subscribe({
    next:(res)=>{
      this.metaData=res.metadata
      this.copyArr= structuredClone(res.data)
      this.products=res.data

      console.log(this.metaData);
      console.log(res);
      
    }
  })
}
searchProduct(){
  this.products=this.copyArr.filter(prod=>prod.title.toLowerCase().includes(this.searchValue.toLowerCase()))
}
onSelectChange(event: Event,start:number): void {
  const selectedValue = (event.target as HTMLSelectElement).value;
  console.log(selectedValue,'console.log(selectedValue)');

  this.getAllProduct(selectedValue,start)
  // this.products=selectedValue!=''? this.productLoaded.filter(prod=>prod.category==selectedValue):this.productLoaded
  console.log('Selected value:', selectedValue);
}

getvalue(sort:string,currentPage:number,limit:number){
// return `sort=-price?limit=${limit}&page=${currentPage}`
}
}

