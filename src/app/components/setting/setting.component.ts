import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { FormField } from '../../interfaces/form-field';
import { UserSettingService } from './../../service/user-setting.service';
import { get } from 'http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule, DynamicFormComponent,ReactiveFormsModule,RouterOutlet,RouterLink,RouterLinkActive],
templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
 
}
   