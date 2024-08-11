// dynamic-form.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from './../../service/form.service';
import { FormField } from './../../interfaces/form-field';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FormField[] = [];
  form!: FormGroup;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.form = this.formService.toFormGroup(this.fields);
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
