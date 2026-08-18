import { AxiosError } from "axios";
import type { NewProductFormValues, Product, ProductFormValues, ProductServiceError } from "../types/product";
import { apiClient } from "./api";
import { toast } from "react-toastify";


const productServiceError = (error: unknown): ProductServiceError => {
  if (error instanceof AxiosError) {
    return {
      message: error.response?.data?.message ?? error.message,
      status: error.response?.status,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: "Unexpected error occurred.",
  };
};

export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const response = await apiClient.get<Product[]>('/products');
      return response.data;
    } catch (error) {
      throw productServiceError(error);
    }
  },

  getProductById: async (id: string): Promise<Product> => {
    try {
      const response = await apiClient.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw productServiceError(error);
    }
  },

  createProduct: async (productData: NewProductFormValues, categoryId: number): Promise<Product> => {
    try {
      const { category, ...productFields } = productData;
      const payload = {
        ...productFields,
        categoryId,
      };
      const response = await apiClient.post<Product>('/products', payload);
      return response.data;
    } catch (error) {
      throw productServiceError(error);
    }
  },

  updateProduct: async (id: number, productData: ProductFormValues, categoryId: number): Promise<Product> => {
    try {
      const { category, ...productFields } = productData;
      const payload = {
        ...productFields,
        categoryId,
      };
      const response = await apiClient.patch<Product>(`/products/${id}`, payload);
      return response.data;
    } catch (error) {
      throw productServiceError(error);
    }
  },

  deleteProduct : async (id:number) => {
    try{
     await apiClient.delete(`/products/${id}`);
      toast.warning("product deleted")
    }
    catch(error)
    {
      throw productServiceError(error);
    }
  }
};