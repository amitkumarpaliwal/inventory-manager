'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { productService } from '../../services/productService';
import type { Product, ProductFormErrors, ProductFormValues } from '../../types/product';
import styles from './editProductForm.module.css'
import { useRouter } from 'next/navigation';

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
  });
  const [errors, setErrors] = useState<ProductFormErrors>(initialErrors);
  const [submitError, setSubmitError] = useState<string>('');

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

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFieldChange =
    (field: keyof ProductFormValues) =>
    (event) => {
      const value = field === 'price' ? Number(event.target.value) : event.target.value;
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
      const updatedProduct: Product = {
        ...product,
        ...formValues,
      };

      await productService.updateProduct(product.id, updatedProduct);
      router.push('/products');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to update product.';
      setSubmitError(message);
    }
  };


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
            value={formValues.price}
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