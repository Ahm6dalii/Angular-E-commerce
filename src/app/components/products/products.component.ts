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
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgClass, ProductsOnlyComponent,PramsStringPipe, NgClass, RouterLink, RouterLinkActive, ProductCardComponent, NgFor, RangeLoopPipe, LoadingScreenComponent, FormsModule, ProductSlideComponent, CatogerySlideComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  animations: [
    trigger('animation', [
      state('start', style({ transform: 'scale(1)' })),
      transition('void => *', [
        style({ transform: 'scale(0)' }),
        animate('500ms')
      ])
    ])]
})
export class ProductsComponent implements OnInit{
  catogeries:any=[] ;
  branding:any=[] ;
  searchValue:string='';
  copyArr:Product[]=[]
  _productService=inject(ProductsService)
  products:any[]=[] ;
  wrongInputValue:boolean=false;
  metaData:Metadata={} as Metadata
  notFoundedCatogery:boolean=false;
ngOnInit(): void {
  this.getAllProduct();
  this.getCatogeries();
  this.getBranding();
}

getCatogeries(){
  this._productService.getCatogery().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.catogeries=res.data  
    }
  })
}
getAllProduct(linkPrams='',start:number=1,limit:number=8){
  this.products=[];
  this.notFoundedCatogery=false
  this._productService.getproduct(linkPrams,start,limit).subscribe({
    next:(res)=>{
      this.metaData=res.metadata
      this.copyArr= structuredClone(res.data)
      if(res.data.length==0)
        {
          this.notFoundedCatogery=true
          this.products=["d"];
        }else{
        this.products=res.data
 }
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
onInputChange(event: Event,start:number):boolean|void {
  this.wrongInputValue=false;
  let inputValue:string =''

  if (Number((event.target as HTMLInputElement).value) < 0) {
    this.wrongInputValue=true;
   return false;
  }
  if ((event.target as HTMLInputElement).value=='') {
     inputValue =''
  }
    inputValue =`price[gte]=${(event.target as HTMLInputElement).value}`;
  console.log(inputValue,'console.log(inputValue)');

  this.getAllProduct(inputValue,start)
  // this.products=inputValue!=''? this.productLoaded.filter(prod=>prod.category==inputValue):this.productLoaded
  console.log('input value:', inputValue);
}

getvalue(sort:string,currentPage:number,limit:number){
// return `sort=-price?limit=${limit}&page=${currentPage}`
}
getBranding(){
  this._productService.getBrannding().subscribe({
    next:(res)=>{
      // console.log(res.data,'ddddddddddddddddddddd');
     this.branding=res.data

      
    }
  })
}
}

