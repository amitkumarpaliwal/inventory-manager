import { use } from 'react';
import { productService } from '../../../services/productService';
import EditProductForm from '../../../shared/editProductForm/editProductForm';
import type { ProductPageProps } from '../../../types/product';

export default function EditPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const product = use(productService.getProductById(id));

  return <EditProductForm product={product} />;
}