import { Component,input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-child-one',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './child-one.html',
  styleUrl: './child-one.css'
})
export class ChildOne {
  form = input.required<FormGroup>();
  title = input<string>('Product');
}
