'use client'

import { useRouter } from 'next/navigation';
import type { Product } from '../../types/product';
import styles from './productcard.module.css';
import ConfirmModal from '../confirmModal/confirmModal';
import { useState } from 'react';
import { productService } from '../../services/productService';

export default function ProductCard({ product, onDeleted }: {product : Product, onDeleted: (id: number) => void}) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
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
        <span className={styles.category}>Electronics</span>
        <span className={styles.status}>{product.status}</span>
      </div>

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


