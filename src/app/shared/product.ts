export interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  category: string;
  description: string;
}

export type NewProduct = Omit<Product, 'id'>;
