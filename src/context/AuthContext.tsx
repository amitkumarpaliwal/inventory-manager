
import { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '@/services/api';
import { clearAdminSession, getAdminSession, saveAdminSession } from '@/utils/storage';

const AuthContext = createContext<any>(null);
export function AuthProvider({ children }: any) {
    const [admin, setAdmin] = useState<any>(null); 
		const [isLoading, setIsLoading] = useState(true);
    useEffect(() => { 
			setAdmin(getAdminSession()); 
			setIsLoading(false) 
		}, []);

    const login = async (credentials: any) => { 
			const res = await apiClient.get('/admins', { 
				params: { email: credentials.email } 
			}); 
			const found = res.data?.[0]; 
			if (!found || found.password !== credentials.password) 
				throw new Error('Invalid email or password'); 
			const session = { id: found.id, name: found.name, email: found.email }; 
			saveAdminSession(session); 
			setAdmin(session); 
		};

    const register = async (payload: any) => { 
			const existing = await apiClient.get('/admins', { params: { email: payload.email } }); 
			if (existing.data?.length) throw new Error('Admin account already exists'); 
			const created = await apiClient.post('/admins', payload); 
			const session = { id: created.data.id, name: created.data.name, email: created.data.email }; 
			saveAdminSession(session); 
			setAdmin(session); 
		};

    const logout = () => { 
			clearAdminSession(); 
			setAdmin(null); 
		};
    return <AuthContext.Provider value={{ admin, isAuthenticated: !!admin, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext);
