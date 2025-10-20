import { Component, signal, computed, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {Api} from '../services/api';
import {ChildOne} from '../child-one/child-one';
import {ChildTwo} from '../child-two/child-two';
import {ChildThree} from '../child-three/child-three';
import { Product, NewProduct } from '../shared/product';




@Component({
  selector: 'app-parent',
  imports: [CommonModule, ReactiveFormsModule, ChildOne, ChildTwo, ChildThree],
  templateUrl: './parent.html',
  styleUrl: './parent.css'
})
export class Parent implements OnInit{

  //Handle the state of the products
  products = signal<Product[]>([]);
  submitting = signal(false);
  error = signal<string | null>(null);
  selectedId = signal<number | null>(null);
  isEditing = computed (() => this.selectedId() !== null );
  showForm = signal(false);
  showDeleteModal = signal(false);
  productToDelete = signal<Product | null>(null);

  //FormGroup , here we define every  FormControl field in the form
  form = new FormGroup({
    name: new FormControl<string>('',{nonNullable:true,validators:[Validators.required,Validators.minLength(2)]}),
    sku: new FormControl<string>('',{nonNullable:true,validators:[Validators.required,Validators.minLength(3)]}),
    price: new FormControl<number>(1,{nonNullable:true,validators:[Validators.required,Validators.min(1)]}),
    category: new FormControl<string>('',{nonNullable:true,validators:[Validators.required]}),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(5)] }),

  });

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private api: Api) {
    // Constructor is required for Angular components
  }

  ngOnInit(): void {
    this.load();
  }

  // CRUD Operations

  // List Products
  load(): void {
    this.api.getProducts().subscribe({
      next: (list) => this.products.set(list),
      error: (err) => this.error.set(err?.message ?? 'Error in loading')
    });
  }

  // Create Product
  createProduct(productData: NewProduct): void {
    this.submitting.set(true);
    this.error.set(null);
    this.api.addProduct(productData).subscribe({
      next: () => {
        this.load();
        this.resetForm();
      },
      error: (err) => this.error.set(err?.message ?? 'Error when inserting a new product'),
      complete: () => this.submitting.set(false)
    });
  }

  // Update Product
  updateProduct(productData: Product): void {
    this.submitting.set(true);
    this.error.set(null);
    this.api.updateProduct(productData).subscribe({
      next: () => {
        this.load();
        this.resetForm();
      },
      error: (err) => this.error.set(err?.message ?? 'Error when updating a existing product'),
      complete: () => this.submitting.set(false)
    });
  }

  // Delete Product
  deleteProduct(id: number): void {
    this.submitting.set(true);
    this.api.deleteProduct(id).subscribe({
      next: () => this.load(),
      error: (err) => this.error.set(err?.message ?? 'Error when trying to delete a product'),
      complete: () => this.submitting.set(false)
    });
  }

  // Event Handlers

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    if (!this.isEditing()) {
      // Creating new product
      const payload: NewProduct = { ...value };
      this.createProduct(payload);
    } else {
      // Updating existing product
      const payload: Product = { id: this.selectedId()!, ...value };
      this.updateProduct(payload);
    }
    this.showForm.set(false); // Return to list after save
  }

  onEdit(p: Product): void {
    this.showForm.set(true);
    this.selectedId.set(p.id);
    this.form.reset({
      name: p.name,
      sku: p.sku,
      price: p.price,
      category: p.category,
      description: p.description
    });
  }

  onRemove(id: number): void {
    this.deleteProduct(id);
  }

  onConfirmDelete(product: Product): void {
    this.productToDelete.set(product);
    this.showDeleteModal.set(true);
  }

  onDeleteConfirmed(): void {
    if (this.productToDelete()) {
      this.deleteProduct(this.productToDelete()!.id);
      this.showDeleteModal.set(false);
      this.productToDelete.set(null);
    }
  }

  onDeleteCancelled(): void {
    this.showDeleteModal.set(false);
    this.productToDelete.set(null);
  }

  onCreateNew(): void {
    this.showForm.set(true);
    this.resetForm();
  }

  onCancel(): void {
    this.showForm.set(false);
    this.resetForm();
  }

  onReloadData(): void {
    this.api.reloadData().subscribe({
      next: (products) => {
        // The API has inserted the backup data into the database and returned the updated list
        this.products.set(products);
      },
      error: (err) => this.error.set(err?.message ?? 'Error reloading data')
    });
  }

  private resetForm(): void {
    this.selectedId.set(null);
    this.form.reset({ name: '', sku: '', price: 1, category: '', description: '' });
  }








}
