import Link from 'next/link';
import {
  getSession,
  signOut,
  useSession,
} from 'next-auth/react';
import fs from 'fs';
import path from 'path';
import Header from '@/shared/header';

interface Product {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  minStock: number;
  category?: string;
}

interface DashboardProps {
  products: Product[];
}

export default function Dashboard({
  products,
}: DashboardProps) {
  const { data: session } = useSession();

  const lowInventoryProducts = products.filter(
    (p) => p.quantity <= p.minStock
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      {/* <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Inventory Manager
            </h1>

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
      </div> */}
      <Header />

      <div className="max-w-7xl mx-auto p-8">
        {/* Stat Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Total Products */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-gray-500 text-sm">
              Total Products
            </div>

            <div className="text-3xl font-bold text-blue-600 mt-2">
              {products.length}
            </div>
          </div>

          {/* Low Inventory */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-gray-500 text-sm">
              Low Inventory
            </div>

            <div className="text-3xl font-bold text-red-500 mt-2">
              {lowInventoryProducts.length}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-gray-500 text-sm">
              Categories
            </div>

            <div className="text-3xl font-bold text-green-600 mt-2">
              {new Set(products.map((p) => p.category)).size}
            </div>
          </div>

          {/* Products Navigation Card */}
          <Link href="/products">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg p-6 h-full hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer">
              <div className="text-sm opacity-90">
                Product Management
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="font-semibold text-lg">
                  View Products
                </span>

                <span className="text-3xl">
                  →
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Low Stock Grid */}
        <div className="bg-white rounded-xl shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">
              Low Inventory Products
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Products that reached minimum
              inventory threshold
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="p-4">
                    Product
                  </th>
                  <th className="p-4">SKU</th>
                  <th className="p-4">
                    Current Stock
                  </th>
                  <th className="p-4">
                    Minimum Stock
                  </th>
                  <th className="p-4">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {lowInventoryProducts.length ===
                0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center p-8 text-gray-500"
                    >
                      No low inventory products.
                    </td>
                  </tr>
                ) : (
                  lowInventoryProducts.map(
                    (product) => (
                      <tr
                        key={product.id}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="p-4 font-medium">
                          {product.name}
                        </td>

                        <td className="p-4">
                          {product.sku}
                        </td>

                        <td className="p-4">
                          {product.quantity}
                        </td>

                        <td className="p-4">
                          {product.minStock}
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              product.quantity <=
                              product.minStock / 2
                                ? 'bg-red-100 text-red-700'
                                : 'bg-orange-100 text-orange-700'
                            }`}
                          >
                            {product.quantity <=
                            product.minStock / 2
                              ? 'Critical'
                              : 'Low Stock'}
                          </span>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(
  context: any
) {
  const session =
    await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const filePath = path.join(
    process.cwd(),
    'db.json'
  );

  const fileContent =
    fs.readFileSync(filePath, 'utf8');

  const db = JSON.parse(fileContent);

  return {
    props: {
      products: db.products || [],
    },
  };
}