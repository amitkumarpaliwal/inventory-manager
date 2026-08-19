'use client';

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { productService } from '../../services/productService';
import type { Product, ProductFormErrors, ProductFormValues } from '../../types/product';
import { CATEGORY_ID_MAP, Category_value_Map, PRODUCT_STATUS_OPTIONS } from '../../utils/contant';
import styles from './editProductForm.module.css'
import { useRouter } from 'next/navigation';
import { categoryService } from '@/services/categoryService';

const initialErrors: ProductFormErrors = {
  name: '',
  description: '',
  price: '',
};

export default function EditProductForm({ product }: {product : Product}) {
  const [formValues, setFormValues] = useState<ProductFormValues>({
    name: product.name,
    description: product.description,
    price: product.price,
    status: product.status,
    category : Category_value_Map[product.categoryId],
    quantity: product.quantity,
    minStock: product.minStock,
  });
  const [errors, setErrors] = useState<ProductFormErrors>(initialErrors);
  const [submitError, setSubmitError] = useState<string>('');
  const [category, setCategory] =  useState<string[]>([]);

  const validateForm = (): boolean => {
    const nextErrors: ProductFormErrors = {};

    if (!formValues.name.trim()) {
      nextErrors.name = 'Product name is required.';
    } else if (formValues.name.trim().length < 2) {
      nextErrors.name = 'Product name must be at least 2 characters.';
    }

    if (!formValues.description.trim()) {
      nextErrors.description = 'Description is required.';
    } else if (formValues.description.trim().length < 10) {
      nextErrors.description = 'Description must be at least 10 characters.';
    }

    if (Number(formValues.price) <= 0) {
      nextErrors.price = 'Price must be greater than 0.';
    }

    if (Number(formValues.quantity) < 0) {
      nextErrors.quantity = 'Quantity cannot be negative.';
    }

    if (Number(formValues.minStock) < 0) {
      nextErrors.minStock = 'Minimum stock cannot be negative.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFieldChange =
    (field: keyof ProductFormValues) =>
    (event) => {
      const value = field === 'price' || field === 'quantity' || field === 'minStock' ? Number(event.target.value) : event.target.value;
      setFormValues((current) => ({ ...current, [field]: value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
      setSubmitError('');
    };

  const router = useRouter();

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // const categoryId = CATEGORY_ID_MAP[normalizeCategory(formValues.category ?? '')];
      const categoryId = CATEGORY_ID_MAP[formValues.category];
      await productService.updateProduct(product.id, formValues, categoryId);
      router.push('/products');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to update product.';
      setSubmitError(message);
    }
  };

  useEffect(()=> {
    const loadCategories = async ()=> {
      const availableCatgories =  await categoryService.getAllCategories();
      setCategory(availableCatgories.map((cat)=> cat.name));
    }
    loadCategories();
  },[]);

   return (
    <div className={styles.editFormContainer}>
      <form
        className={styles.editProductForm}
        onSubmit={handleForm}
        noValidate
      >
        <h2 className={styles.title}>Edit Product</h2>

        <div className={styles.formGroup}>
          <label htmlFor="name">Product Name</label>

          <input
            id="name"
            type="text"
            value={formValues.name}
            onChange={handleFieldChange('name')}
          />

          {errors.name && (
            <span className={styles.errorMessage}>
              {errors.name}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price">Price</label>

          <input
            id="price"
            type="number"
            value={formValues.price === 0 ? "": formValues.price}
            onChange={handleFieldChange('price')}
            min="0"
          />

          {errors.price && (
            <span className={styles.errorMessage}>
              {errors.price}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="quantity">Quantity</label>

          <input
            id="quantity"
            type="number"
            value={formValues.quantity === 0 ? "" : formValues.quantity}
            onChange={handleFieldChange('quantity')}
            min="0"
          />

          {errors.quantity && (
            <span className={styles.errorMessage}>
              {errors.quantity}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="minStock">Minimum Stock</label>

          <input
            id="minStock"
            type="number"
            value={formValues.minStock === 0 ? "" : formValues.minStock}
            onChange={handleFieldChange('minStock')}
            min="0"
          />

          {errors.minStock && (
            <span className={styles.errorMessage}>
              {errors.minStock}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            value={formValues.description}
            onChange={handleFieldChange('description')}
          />

          {errors.description && (
            <span className={styles.errorMessage}>
              {errors.description}
            </span>
          )}
        </div>

        <div className= {styles.formGroup}>
          <label htmlFor='category'>Category</label>
          <select
           id ="category"
           value={formValues.category}
           onChange={handleFieldChange('category')}>
            
            {category.map ((cat) => 
            <option key={cat} value={cat}>
              {cat}
            </option>)}


          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status">Status</label>

          <select
            id="status"
            value={formValues.status}
            onChange={handleFieldChange('status')}
          >
            {PRODUCT_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {submitError && (
          <p className={styles.submitError}>
            {submitError}
          </p>
        )}

        <button
          type="submit"
          className={styles.updateButton}
        >
          Update Product
        </button>
      </form>
    </div>
  );

}