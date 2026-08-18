export interface Product {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  status: string;
  image?: string;
  quantity: number;
  minStock: number;
}

export interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  status: string;
  category:string;
  quantity: number;
  minStock: number;
}

export interface ProductFormErrors {
  name?: string;
  description?: string;
  price?: string;
  quantity?: string;
  minStock?: string;
}

export interface NewProductFormValues {
  sku: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  status: string;
  quantity: number;
  minStock: number;
}

export interface NewProductFormErrors {
  sku?: string;
  name?: string;
  description?: string;
  price?: string;
  category?: string;
  quantity?: string;
  minStock?: string;
}

export interface ProductServiceError {
  message: string;
  status?: number;
}

export interface ProductPageParams {
  id: string;
}

export interface ProductPageProps {
  params: Promise<ProductPageParams>;
}