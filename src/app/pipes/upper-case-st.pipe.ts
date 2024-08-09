import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperCaseSt',
  standalone: true
})
export class UpperCaseStPipe implements PipeTransform {

  transform(value: string): string {
    return value.split(' ').slice(0,2).join(' ').toUpperCase();
  }


}
