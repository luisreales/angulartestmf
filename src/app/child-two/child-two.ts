import { Component,input,output } from '@angular/core';
import { CommonModule,CurrencyPipe } from '@angular/common';
import { Product } from '../shared/product';

@Component({
  selector: 'app-child-two',
  imports: [CommonModule,CurrencyPipe],
  templateUrl: './child-two.html',
  styleUrl: './child-two.css'
})
export class ChildTwo {
  products = input<Product[]>([]);
  edit = output<Product>();
  remove = output<number>();
  reloadData = output<void>();
  confirmDelete = output<Product>();

}
