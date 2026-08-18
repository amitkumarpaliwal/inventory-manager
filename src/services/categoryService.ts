import { category, CategoryServiceError } from "@/types/category";
import { apiClient } from "./api"
import { AxiosError } from "axios";


const categoryServiceError = (error: unknown): CategoryServiceError => {
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

 export const categoryService = {

    getAllCategories :async () : Promise <category[]>=> {
        try{
        const response =  await apiClient.get('/categories');
        return response.data;
        }
        catch(error)
        {
            throw categoryServiceError(error);
        }
    }
}