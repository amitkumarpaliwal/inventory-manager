"use client";

import { useEffect, useState } from 'react';
import { productService } from '../../services/productService';
import ProductCard from '../../shared/productcard/productcard';
import type { Product } from '../../types/product';
import styles from './productsPage.module.css';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const router =  useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
  const loadProducts = async (): Promise<void> => {
        const productsData = await productService.getAllProducts();
        setProducts(productsData);      
    };
    void loadProducts();
  }, []);

  const handleProductDeleted = (id: number): void => {
    setProducts((current) => current.filter((product) => product.id !== id));
  };

  const handleAddButton = () => {
    router.push('/add');
  }

  return (
    <div className={styles.layout}>
      <div className={styles.productgrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onDeleted ={handleProductDeleted} />
        ))}
      </div>
      <div className= {styles.addButton}>
        <button type='button'  onClick={handleAddButton}>Add Item</button>
      </div>
    </div>
  );
}