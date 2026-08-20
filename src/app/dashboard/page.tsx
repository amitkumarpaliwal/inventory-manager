import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  minStock: number;
  category?: string;
}

export default async function Dashboard() {
  const session = await getServerSession(
    authOptions
  );

  if (!session) {
    redirect('/login');
  }

  const response = await fetch(
    'http://localhost:3001/products',
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error(
      'Failed to load products'
    );
  }

  const products: Product[] =
    await response.json();

  const lowInventoryProducts =
    products.filter(
      (product) =>
        product.quantity <=
        product.minStock
    );

  const totalCategories =
    new Set(
      products.map(
        (product) => product.category
      )
    ).size;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-gray-500 text-sm">
              Total Products
            </div>

            <div className="text-3xl font-bold text-blue-600 mt-2">
              {products.length}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-gray-500 text-sm">
              Low Inventory
            </div>

            <div className="text-3xl font-bold text-red-500 mt-2">
              {lowInventoryProducts.length}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-gray-500 text-sm">
              Categories
            </div>

            <div className="text-3xl font-bold text-green-600 mt-2">
              {totalCategories}
            </div>
          </div>

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
                  <th className="p-4">
                    SKU
                  </th>
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
                      No low inventory
                      products.
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