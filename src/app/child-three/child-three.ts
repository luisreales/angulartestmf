import { Component,input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-child-three',
  imports: [CommonModule],
  templateUrl: './child-three.html',
  styleUrl: './child-three.css'
})
export class ChildThree {
  form = input.required<FormGroup>();
  submitting = input<boolean>(false);

  //actions
  save = output<void>();
  cancelProduct = output<void>();
}
