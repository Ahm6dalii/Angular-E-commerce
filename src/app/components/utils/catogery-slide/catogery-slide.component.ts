import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Product } from '../../../interfaces/product';
import { ProductCardComponent } from "../product-card/product-card.component";
@Component({
  selector: 'app-catogery-slide',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule, CommonModule, RouterLink, ProductCardComponent],
  templateUrl: './catogery-slide.component.html',
  styleUrl: './catogery-slide.component.css'
})
export class CatogerySlideComponent {
  @Input() product!:Product[];

  responsiveOptions: any[] | undefined;
  ngOnInit() {
    console.log(this.product);

    this.responsiveOptions = [
      // {
      //   breakpoint: '1199px',
      //   numVisible: 4,
      //   numScroll: 1,
      // },
      {
        breakpoint: '991px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '480px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
