// form.service.ts
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormField } from '../interfaces/form-field'; 

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  toFormGroup(fields: FormField[]): FormGroup {
    const group: any = {};
    fields.forEach(field => {
      group[field.name] = field.required
        ? new FormControl(field.value || '', Validators.required)
        : new FormControl(field.value || '');
    });
    return new FormGroup(group);
  }
}
