'use client';
import Link from 'next/link';

import {
  signOut,
  useSession,
} from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();

  return (
		<div className="bg-white shadow-sm border-b">
			<div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
				<div>
					<Link href="/" className="hover:text-blue-600">
						<h1 className="text-3xl font-bold text-slate-800 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
							Inventory Manager
						</h1>
					</Link>

					<p className="text-gray-500 mt-1">
						Welcome {session?.user?.name}
					</p>
				</div>

				<button
					onClick={() =>
						signOut({
							callbackUrl: '/login',
						})
					}
					className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition cursor-pointer"
				>
					Logout
				</button>
			</div>
	</div>
)};