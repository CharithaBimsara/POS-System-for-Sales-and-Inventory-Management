import { FaStore, FaBoxes, FaChartLine, FaSearch, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const hardcodedShops = [
  {
    id: 2,
    name: "Pro Decorators",
    location: "Industrial Zone",
    stock: [
      { product: "Exterior Paint", currentStock: 80, distributed: 150, category: "paints" },
      { product: "Wood Varnish", currentStock: 40, distributed: 60, category: "varnishes" }
    ],
    sales: { weekly: 32, monthly: 135 }
  },
  {
    id: 3,
    name: "Elite Finishes",
    location: "Uptown",
    stock: [
      { product: "High Gloss Paint", currentStock: 70, distributed: 120, category: "paints" },
      { product: "Clear Lacquer", currentStock: 55, distributed: 90, category: "lacquers" }
    ],
    sales: { weekly: 50, monthly: 200 }
  }
];

const Dashboard1 = () => {
  const [selectedShop, setSelectedShop] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsAndCreateShop = async () => {
      try {
        const response = await fetch('https://40a6-192-248-95-64.ngrok-free.app/api/products', {
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const products = await response.json();

        // Create API shop with calculated values
        const apiShop = {
          id: 1,
          name: "Shantha Hardware",
          location: "Digital Zone",
          stock: products.map(product => ({
            product: product.name,
            currentStock: product.stock,
            distributed: product.stock + Math.floor(Math.random() * 500) + 100, // Random distributed value
            category: product.category,
            price: product.price
          })),
          sales: {
            weekly: products.reduce((sum, p) => sum + (p.stock * p.price * 0.1), 0),
            monthly: products.reduce((sum, p) => sum + (p.stock * p.price * 0.4), 0)
          }
        };

        setShops([apiShop, ...hardcodedShops]);
      } catch (err) {
        setError(err.message);
        setShops(hardcodedShops);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCreateShop();
  }, []);

  const processChartData = (shop) => {
    return shop.stock.map(item => ({
      product: item.product,
      sales: item.distributed - item.currentStock,
      distributed: item.distributed,
      currentStock: item.currentStock,
      price: item.price
    }));
  };

  const getCategoryStyle = (category) => {
    switch (category.toLowerCase()) {
      case 'pipes': return 'bg-blue-100 text-blue-800';
      case 'fittings': return 'bg-green-100 text-green-800';
      case 'paints': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading shop data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-red-500 text-center max-w-md">
          <h2 className="text-xl font-bold mb-2">Error Loading Data</h2>
          <p className="mb-4">{error}</p>
          <p className="text-gray-600">Showing hardcoded shop data only</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {selectedShop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">{selectedShop.name} Analytics</h3>
                <button 
                  onClick={() => setSelectedShop(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-4">Sales Distribution</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={processChartData(selectedShop)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="product" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" fill="#3B82F6" name="Sales Quantity" />
                        <Bar dataKey="currentStock" fill="#10B981" name="Current Stock" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Products</p>
                    <p className="text-xl font-bold">{selectedShop.stock.length}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Sales Volume</p>
                    <p className="text-xl font-bold">
                      {selectedShop.stock
                        .reduce((sum, item) => sum + (item.distributed - item.currentStock), 0)
                        .toLocaleString()} L
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Average Price</p>
                    <p className="text-xl font-bold">
                      LKR {(
                        selectedShop.stock.reduce((sum, item) => sum + item.price, 0) /
                        selectedShop.stock.length
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Product</th>
                      <th className="text-left py-3 px-4">Category</th>
                      <th className="text-left py-3 px-4">Price</th>
                      <th className="text-left py-3 px-4">Stock</th>
                      <th className="text-left py-3 px-4">Sales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedShop.stock.map((item, index) => (
                      <tr key={index} className="border-b last:border-b-0">
                        <td className="py-3 px-4 font-medium">{item.product}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${getCategoryStyle(item.category)}`}>
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">LKR {item.price.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          {item.currentStock.toLocaleString()} / {item.distributed.toLocaleString()} L
                        </td>
                        <td className="py-3 px-4 text-green-600">
                          {(item.distributed - item.currentStock).toLocaleString()} L
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Sales Insights</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Top Selling Product: {
                      selectedShop.stock.reduce((max, item) => 
                        (item.distributed - item.currentStock) > (max.distributed - max.currentStock) ? item : max
                      ).product
                    }
                  </li>
                  <li>
                    Total Inventory Value: LKR {
                      selectedShop.stock
                        .reduce((sum, item) => sum + (item.currentStock * item.price), 0)
                        .toLocaleString()
                    }
                  </li>
                  <li>
                    {selectedShop.stock.filter(item => item.currentStock < 50).length} 
                    products need restocking
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Slon Lanka (Pvt) Ltd</h1>
            <p className="text-gray-600 mt-2">Real-time inventory tracking and analytics</p>
          </div>
          <div className="relative mt-4 md:mt-0">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search shops..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <FaStore className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Active Shops</p>
                <p className="text-2xl font-bold">{shops.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <FaBoxes className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Inventory Value</p>
                <p className="text-2xl font-bold">
        LKR {(1230000).toLocaleString()} {/* Hardcoded value */}
      </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <FaChartLine className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Monthly Sales</p>
                <p className="text-2xl font-bold">
        LKR {(450000).toLocaleString()} {/* Hardcoded value */}
      </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.filter(shop => 
            shop.name.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((shop) => (
            <div key={shop.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{shop.name}</h3>
                    <p className="text-sm text-gray-500">{shop.location}</p>
                  </div>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    shop.stock.some(item => item.currentStock < 50) 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {shop.stock.some(item => item.currentStock < 50) ? 'Needs Restock' : 'Active'}
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  {shop.stock.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{item.product}</span>
                        <span className="text-gray-500">
                          {item.currentStock.toLocaleString()} / {item.distributed.toLocaleString()} L
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ 
                            width: `${Math.min(
                              (item.currentStock / item.distributed) * 100, 
                              100
                            )}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <p className="text-sm text-gray-500">Inventory Value</p>
                    <p className="font-semibold">
                      LKR {
                        shop.stock
                          .reduce((sum, item) => sum + (item.currentStock * item.price), 0)
                          .toLocaleString()
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Monthly Sales</p>
                    <p className="font-semibold">
                      LKR {
                        shop.stock
                          .reduce((sum, item) => sum + ((item.distributed - item.currentStock) * item.price), 0)
                          .toLocaleString()
                      }
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedShop(shop)}
                  className="mt-4 w-full bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  View Detailed Analytics
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard1;