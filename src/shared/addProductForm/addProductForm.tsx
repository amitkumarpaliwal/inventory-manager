'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { productService } from '../../services/productService';
import type { NewProductFormErrors, NewProductFormValues } from '../../types/product';
import { CATEGORY_ID_MAP, normalizeCategory, PRODUCT_STATUS_OPTIONS } from '../../utils/contant';
import styles from './addProductForm.module.css';
import { categoryService } from '../../services/categoryService'

const initialFormValues: NewProductFormValues = {
  sku: '',
  name: '',
  description: '',
  price: 0,
  image: '',
  category: '',
  status: 'Active',
  quantity: 0,
  minStock: 0,
};

const initialErrors: NewProductFormErrors = {};

export default function AddProductForm() {
  const [formValues, setFormValues] = useState<NewProductFormValues>(initialFormValues);
  const [errors, setErrors] = useState<NewProductFormErrors>(initialErrors);
  const [submitError, setSubmitError] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);

  const validateForm = (): boolean => {
    const nextErrors: NewProductFormErrors = {};

    if (!formValues.sku.trim()) {
      nextErrors.sku = 'SKU is required.';
    }

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

    if (!formValues.category.trim()) {
      nextErrors.category = 'Category is required.';
    } else if (!CATEGORY_ID_MAP[normalizeCategory(formValues.category)]) {
      nextErrors.category = 'Category must be Electronics or Clothing.';
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
    (field: keyof NewProductFormValues) =>
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
      const categoryId = CATEGORY_ID_MAP[normalizeCategory(formValues.category)];
      await productService.createProduct(formValues, categoryId);
      router.push('/products');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to add product.';
      setSubmitError(message);
    }
  };

useEffect(()=> {
  const loadCategories = async ()=> {
  const categories =  await categoryService.getAllCategories();
  setCategories(categories.map( c => c.name));
  }
  loadCategories();
},[]);

  return (
    <div className={styles.addFormContainer}>
      <form
        className={styles.addProductForm}
        onSubmit={handleForm}
        noValidate
      >
        <h2 className={styles.title}>Add Electronics Product</h2>

        <div className={styles.formGroup}>
          <label htmlFor="sku">SKU</label>

          <input
            id="sku"
            type="text"
            value={formValues.sku}
            onChange={handleFieldChange('sku')}
          />

          {errors.sku && (
            <span className={styles.errorMessage}>
              {errors.sku}
            </span>
          )}
        </div>

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
            value={formValues.price  === 0 ? "" : formValues.price}
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

        <div className={styles.formGroup}>
          <label htmlFor="image">Image Path</label>

          <input
            id="image"
            type="text"
            value={formValues.image}
            onChange={handleFieldChange('image')}
            placeholder="/images/laptop.jpg"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Category</label>
          <select
          id ="category"
          value={formValues.category}
          onChange={handleFieldChange('category')}>
          {
            categories.map((c)=> 
            <option key = {c} value={c}>
              {c}
            </option>
            )
          }            
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
          className={styles.addButton}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
