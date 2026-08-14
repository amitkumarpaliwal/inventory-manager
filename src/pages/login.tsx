import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function Login() {
	const [isRegister, setIsRegister] = useState(false); 
	const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' }); 
	const [error, setError] = useState(''); 
	const { login, register } = useAuth(); 
	const router = useRouter(); 
	
	const submit = async (e: any) => { 
		e.preventDefault(); 
		try { 
			setError(''); 
			if (isRegister) { 
				if (form.password !== form.confirm) throw new Error('Passwords do not match'); 
				await register({ name: form.name, email: form.email, password: form.password }); 
				router.push('/login'); 
				setIsRegister(false);
			} else { 
				await login({ email: form.email, password: form.password }); 
				router.push('/dashboard'); 
			}
		} catch (err: any) { 
			setError(err.message); 
		} 
	}; 
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-blue-500 flex items-center justify-center p-4">
			<div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">
				<h1 className="text-3xl font-bold text-center mb-6">Inventory Admin</h1>
				<div className="flex gap-2 mb-6">
					<button className={`flex-1 p-3 rounded-xl ${!isRegister ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} onClick={() => setIsRegister(false)}>Login</button>
					<button className={`flex-1 p-3 rounded-xl ${isRegister ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} onClick={() => setIsRegister(true)}>Register</button>
				</div>
				
				<form onSubmit={submit} className="space-y-4">{isRegister && <input className="w-full border rounded-xl p-3" placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />}
					<input 
						className="w-full border rounded-xl p-3" 
						placeholder="Email" 
						value={form.email} 
						onChange={e => setForm({ ...form, email: e.target.value })} />
					<input 
						type="password" 
						className="w-full border rounded-xl p-3" placeholder="Password" 
						value={form.password} 
						onChange={e => setForm({ ...form, password: e.target.value })} />
					
					{isRegister && <input type="password" className="w-full border rounded-xl p-3" placeholder="Confirm Password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} />}

					<button 
						className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl">	{isRegister ? 'Create Account' : 'Sign In'}
					</button>

					{error && <p className="text-red-600 text-sm">{error}</p>}
				</form>
			</div>
		</div>
	);
}