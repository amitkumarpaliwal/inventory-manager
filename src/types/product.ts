export interface Product {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  status: string;
  image?: string;
}

export interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  status: string;
}

export interface ProductFormErrors {
  name?: string;
  description?: string;
  price?: string;
}

export interface NewProductFormValues {
  sku: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  status: string;
}

export interface NewProductFormErrors {
  sku?: string;
  name?: string;
  description?: string;
  price?: string;
  category?: string;
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