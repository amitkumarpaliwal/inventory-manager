export const API_BASE_URL = 'http://localhost:3001';

export const STORAGE_KEYS = {
  AUTH_ADMIN: 'inventory_admin_session',
} as const;

export const PRODUCT_STATUS_OPTIONS = ['Active', 'Inactive', 'Discontinued'] as const;

export const PRODUCT_STATUS_STYLES: Record<string, { background: string; color: string }> = {
  Active: { background: '#dcfce7', color: '#15803d' },
  Inactive: { background: '#fee2e2', color: '#b91c1c' },
  Discontinued: { background: '#fef9c3', color: '#a16207' },
};

export const CATEGORY_ID_MAP: Record<string, number> = {
  electronics: 1,
  clothing: 2,
};

export const Category_value_Map :Record<number,string> ={
  1: "electronics",
  2: "clothing"
}
export const normalizeCategory = (value: string): string => value.trim().toLowerCase();