import { AuthenticatedAdmin } from '@/types/auth';
import { STORAGE_KEYS } from './constants';

export const getStoredAdminSession =
(): AuthenticatedAdmin | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const storedSession = localStorage.getItem(
            STORAGE_KEYS.AUTH_ADMIN
        );

        if (!storedSession) {
            return null;
        }

        return JSON.parse(
            storedSession
        ) as AuthenticatedAdmin;
    } catch {
        return null;
    }
};

export const saveAdminSession = (
  adminDetails: AuthenticatedAdmin
) => {
  localStorage.setItem(STORAGE_KEYS.AUTH_ADMIN, JSON.stringify(adminDetails));
};

export const clearAdminSession = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_ADMIN);
};