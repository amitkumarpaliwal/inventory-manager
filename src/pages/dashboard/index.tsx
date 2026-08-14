import ProtectedRoute from '../../components/guards/ProtectedRoute'; 
import { useAuth } from '../../context/AuthContext'; 
import { useRouter } from 'next/router'; 

export default function Dashboard() { 
	const { admin, logout } = useAuth(); 
	const router = useRouter(); 
	
	return (
		<ProtectedRoute>
			<div className="min-h-screen bg-gray-100 p-8">
				<div className="flex justify-between">
					<div>
						<h1 className="text-3xl font-bold">Inventory Dashboard</h1>
						<p>Welcome {admin?.name}</p>
					</div>
					<button onClick={ () => {
						logout();
						router.push('/login')
						}} className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer h-10">Logout</button>
				</div>
				<div className="grid md:grid-cols-3 gap-6 mt-8">
					<div className="bg-white p-6 rounded-xl shadow">
						<h3>Products</h3>
						<p className="text-4xl font-bold">125</p>
					</div>
					<div className="bg-white p-6 rounded-xl shadow">
						<h3>Categories</h3>
						<p className="text-4xl font-bold">12</p>
					</div>
					<div className="bg-white p-6 rounded-xl shadow">
						<h3>Low Stock</h3>
						<p className="text-4xl font-bold">8</p>
					</div>
				</div>
			</div>
		</ProtectedRoute>
	);
}