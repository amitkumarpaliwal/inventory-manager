'use client'

import { useRouter } from 'next/navigation';
import type { Product } from '../../types/product';
import styles from './productcard.module.css';
import ConfirmModal from '../confirmModal/confirmModal';
import { useEffect, useState } from 'react';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { PRODUCT_STATUS_STYLES } from '../../utils/contant';

export default function ProductCard({ product, onDeleted }: {product : Product, onDeleted: (id: number) => void}) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    const loadCategory = async () => {
      const categories = await categoryService.getAllCategories();
      const matchedCategory = categories.find((c) => Number(c.id) === product.categoryId);
      setCategoryName(matchedCategory ? matchedCategory.name : '');
    };
    loadCategory();
  }, [product.categoryId]);

  const handleEdit = (): void => {
    router.push(`/edit/${product.id}`);
  };

  const handleDelete = (id:number):void => {    
 setShowModal(true);
 setProductIdToDelete(id);
  }

  const cancelDelete = () =>{
    setShowModal(false);
    setProductIdToDelete(null);
  }

  const confirmDelete = async () => {
    if (productIdToDelete === null) {
      return;
    }
    await productService.deleteProduct(productIdToDelete);

    setShowModal(false);
    setProductIdToDelete(null);
      onDeleted(productIdToDelete);
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.category}>{categoryName}</span>
        <span className={styles.status} style={PRODUCT_STATUS_STYLES[product.status]}>{product.status}</span>
      </div>

      {product.image && (
        <img className={styles.image} src={product.image} alt={product.name} />
      )}

      <div className={styles.content}>
        <h2 className={styles.name}>{product.name}</h2>

        <p className={styles.description}>{product.description}</p>

        <div className={styles.price}>{product.price}</div>
      </div>

      <div className={styles.actions}>
        <button className={styles.editButton} type='button' onClick={handleEdit}>
          Edit Item
        </button>
        <button className={styles.deleteButton} type='button' onClick={() =>handleDelete(product.id)}>
          Delete Item
        </button>
      </div>
{    showModal &&  (<ConfirmModal
  isOpen={showModal}
  title="Delete Product"
  message="Are you sure you want to delete this product?"
  onConfirm={confirmDelete}
  onCancel={cancelDelete}
/>)}

    </div>
  );
}


