import { apiClient } from "./api"

export const productService =  {
    getallProducts: async () => {       
          const response = await apiClient.get('/products');
          return response.data;  

    }
}