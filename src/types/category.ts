export interface category {
    id : string;
    name : string;
    description : string;
}

export interface CategoryServiceError {
  message: string;
  status?: number;
}