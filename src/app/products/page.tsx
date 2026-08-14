"use client";

import { useEffect, useState } from 'react';
import { productService } from '../../services/productService';
import ProductCard from '../../shared/productcard/productcard';
import type { Product } from '../../types/product';
import styles from './productsPage.module.css';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async (): Promise<void> => {
        const productsData = await productService.getAllProducts();
        setProducts(productsData);      
    };

    void loadProducts();
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.productgrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}