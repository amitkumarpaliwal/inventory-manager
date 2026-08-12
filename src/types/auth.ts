import { AdminAccount } from './admin';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationDetails {
  name: string;
  email: string;
  password: string;
}

export interface AuthenticatedAdmin {
  id: number;
  name: string;
  email: string;
}

export interface AuthContextValue {
  adminAccount: AuthenticatedAdmin | null;
  isAuthenticated: boolean;
  login: (
    credentials: LoginCredentials
  ) => Promise<void>;
  register: (
    registrationDetails: RegistrationDetails
  ) => Promise<void>;
  logout: () => void;
}

export type InventoryAdminRecord = AdminAccount;