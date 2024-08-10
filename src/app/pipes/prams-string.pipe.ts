import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pramsString',
  standalone: true
})
export class PramsStringPipe implements PipeTransform {

  transform(value: unknown, currentPage:number,limit:number): string {
    // `sort=-price&limit=${limit}&page=${currentPage}`
    console.log( `page=${currentPage}&limit=${limit}&${value}`);
    
    return `limit=${limit}&page=${currentPage}&${value}`;
  }

}
