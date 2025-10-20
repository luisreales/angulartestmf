import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Product} from '../shared/product';
import { Observable } from 'rxjs';


type NewProduct = Omit<Product,'id'>;

@Injectable({
  providedIn: 'root'
})


export class Api {

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private http: HttpClient) {

  }

  private baseUrl = 'http://localhost:3000/products'; // json-server

  //Read
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl);
  }
  getProductById(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }
  //Create
  addProduct(data:NewProduct): Observable<Product>{
    return this.http.post<Product>(this.baseUrl,data);
  }
  //Update
  updateProduct(p:Product):Observable<Product>{
    return this.http.put<Product>(`${this.baseUrl}/${p.id}`,p);
  }

  //delete
  deleteProduct(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  //reload data from backup - insert backup data into the database
  reloadData(): Observable<Product[]>{
    const backupData: NewProduct[] = [
      {
        "name": "Notebook",
        "sku": "NBK-001",
        "price": 9.99,
        "category": "Office",
        "description": "Cuaderno rayado A4"
      },
      {
        "name": "Mechanical Keyboard",
        "sku": "KEY-002",
        "price": 89.5,
        "category": "Peripherals",
        "description": "Teclado mecánico switch brown"
      },
      {
        "name": "Wireless Mouse",
        "sku": "MSE-003",
        "price": 29.99,
        "category": "Peripherals",
        "description": "Mouse inalámbrico ergonómico"
      },
      {
        "name": "Monitor 24\"",
        "sku": "MON-004",
        "price": 199.99,
        "category": "Displays",
        "description": "Monitor LED Full HD 24 pulgadas"
      },
      {
        "name": "USB Flash Drive 32GB",
        "sku": "USB-005",
        "price": 14.99,
        "category": "Storage",
        "description": "Memoria USB 3.0 de 32GB"
      },
      {
        "name": "External Hard Drive 1TB",
        "sku": "HDD-006",
        "price": 79.99,
        "category": "Storage",
        "description": "Disco duro externo USB 3.0 1TB"
      },
      {
        "name": "Webcam HD",
        "sku": "CAM-007",
        "price": 49.99,
        "category": "Peripherals",
        "description": "Cámara web HD 1080p con micrófono"
      },
      {
        "name": "Headphones",
        "sku": "HPH-008",
        "price": 39.99,
        "category": "Audio",
        "description": "Auriculares inalámbricos con cancelación de ruido"
      },
      {
        "name": "Printer Ink Cartridge",
        "sku": "INK-009",
        "price": 24.99,
        "category": "Consumables",
        "description": "Cartucho de tinta negro para impresora"
      },
      {
        "name": "Laptop Stand",
        "sku": "STD-010",
        "price": 34.99,
        "category": "Accessories",
        "description": "Soporte ajustable para laptop"
      }
    ];

    // Insert each backup item into the database
    const insertPromises = backupData.map(item => this.addProduct(item).toPromise());

    return new Observable(observer => {
      Promise.all(insertPromises)
        .then(() => {
          // After all inserts are done, fetch the updated list
          this.getProducts().subscribe({
            next: (products) => {
              observer.next(products);
              observer.complete();
            },
            error: (err) => observer.error(err)
          });
        })
        .catch(err => observer.error(err));
    });
  }



}
