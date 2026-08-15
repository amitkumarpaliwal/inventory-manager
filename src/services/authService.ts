import { apiClient } from './api';
import {
  AuthenticatedAdmin,
  LoginCredentials,
  RegistrationDetails,
} from '@/types/auth';
import { AdminAccount } from '@/types/admin';

const mapAuthenticatedAdmin = (
  adminRecord: AdminAccount
): AuthenticatedAdmin => ({
  id: adminRecord.id,
  name: adminRecord.name,
  email: adminRecord.email,
});

export const authenticateAdmin = async (
  credentials: LoginCredentials
): Promise<AuthenticatedAdmin> => {
	console.log('inside auth service...');
  const adminLookupResponse =
    await apiClient.get<AdminAccount[]>(
      '/admins',
      {
        params: {
          email: credentials.email,
        },
      }
    );

  const matchingAdmin =
    adminLookupResponse.data?.[0];

  if (
    !matchingAdmin ||
    matchingAdmin.password !==
      credentials.password
  ) {
    throw new Error(
      'Invalid email or password'
    );
  }

  return mapAuthenticatedAdmin(
    matchingAdmin
  );
};

export const registerAdminAccount =
  async (
    registrationDetails: RegistrationDetails
  ): Promise<AuthenticatedAdmin> => {
    const existingAdminResponse =
      await apiClient.get<AdminAccount[]>(
        '/admins',
        {
          params: {
            email:
              registrationDetails.email,
          },
        }
      );

    const existingAdmin =
      existingAdminResponse.data?.[0];

    if (existingAdmin) {
      throw new Error(
        'Admin account already exists'
      );
    }

    const createdAdminResponse =
      await apiClient.post<AdminAccount>(
        '/admins',
        registrationDetails
      );

    return mapAuthenticatedAdmin(
      createdAdminResponse.data
    );
  };