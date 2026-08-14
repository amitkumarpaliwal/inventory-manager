import { useRouter } from 'next/navigation';
import type { Product } from '../../types/product';
import styles from './productcard.module.css';


export default function ProductCard({ product }: {product : Product}) {
  const router = useRouter();

  const handleClick = (): void => {
    router.push(`/edit/${product.id}`);
  };

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
        <button className={styles.editButton} type='button' onClick={handleClick}>
          Edit Product
        </button>
      </div>
    </div>
  );
}