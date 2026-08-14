export interface Product {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  status: string;
}

export interface ProductFormValues {
  name: string;
  description: string;
  price: number;
}

export interface ProductFormErrors {
  name?: string;
  description?: string;
  price?: string;
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