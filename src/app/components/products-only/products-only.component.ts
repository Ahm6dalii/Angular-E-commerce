import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../service/products.service';
import { ProductCardComponent } from "../utils/product-card/product-card.component";

@Component({
  selector: 'app-products-only',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './products-only.component.html',
  styleUrl: './products-only.component.css'
})
export class ProductsOnlyComponent {
  @Input() products:Product[]=[] as Product[]
//   products:Product[]=[] ;
//   _productService=inject(ProductsService)
// ngOnInit(): void {
//   this.getAllProduct();
// }
// getAllProduct(linkPrams='',start:number=1,limit:number=8){
//   this.products=[];
//   this._productService.getproduct(linkPrams,start,limit).subscribe({
//     next:(res)=>{
//       this.products=res.data
//       console.log(res);     
//     }
//   })
// }
}
