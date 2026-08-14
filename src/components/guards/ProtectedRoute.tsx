import { useRouter } from "next/router"; 
import { useEffect } from "react"; 
import { useAuth } from "@/context/AuthContext"; 

export default function ProtectedRoute({ children }: any) { 
	const { isAuthenticated, isLoading } = useAuth(); 
	const router = useRouter(); 
	useEffect(() => { 
		if (!isLoading && !isAuthenticated) 
				router.replace('/login'); 
	}, [isAuthenticated, isLoading, router]); 
		
		if (isLoading) return <p>Loading...</p>; 
		if (!isAuthenticated) return null; 
			return children; 
}