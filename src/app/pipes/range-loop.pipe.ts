import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rangeLoop',
  standalone: true
})
export class RangeLoopPipe implements PipeTransform {

  transform(value: number): number[] {
    return Array.from({ length: value }, (v, k) => k + 1);
  }

}
