import { useState, useEffect } from 'react';
import { FiShoppingCart, FiPackage, FiTrash, FiDollarSign } from 'react-icons/fi'; 
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ProductManagement from './ProductManagement';
import NumberPad from './NumberPad';
const shanthaImage = "/shantha.jpeg";


const Dashboard2 = () => {
    const [activeTab, setActiveTab] = useState('pos');
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [amountReceived, setAmountReceived] = useState('');
    const [change, setChange] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch products from API
     // Fetch products from API
     useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://40a6-192-248-95-64.ngrok-free.app/api/products', {
                    headers: {
                        'ngrok-skip-browser-warning': 'true'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                
                if (!Array.isArray(data)) {
                    throw new Error('Invalid data format received from API');
                }

                setProducts(data.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: parseFloat(item.price),
                    stock: parseInt(item.stock),
                    category: item.category
                })));
                
                setError(null);
            } catch (err) {
                console.error('API Error:', err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);


    // POS Functions
    const addToCart = async (product) => {
        if (product.stock <= 0) return;
        
        try {
            // Update database stock
            const updatedProduct = { ...product, stock: product.stock - 1 };
            const response = await fetch(`https://40a6-192-248-95-64.ngrok-free.app/api/products/${product.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct)
            });

            if (!response.ok) throw new Error('Failed to update stock');

            // Update local state
            const existingItem = cart.find(item => item.id === product.id);
            const updatedCart = existingItem
                ? cart.map(item => 
                    item.id === product.id 
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                    )
                : [...cart, { ...product, quantity: 1 }];

            setCart(updatedCart);
            setProducts(products.map(p => 
                p.id === product.id ? updatedProduct : p
            ));
        } catch (err) {
            console.error('Error updating product:', err);
            alert('Failed to add to cart. Please try again.');
        }
    };

    const removeFromCart = async (productId) => {
        const removedItem = cart.find(item => item.id === productId);
        if (!removedItem) return;

        try {
            // Restore stock in database
            const currentProduct = products.find(p => p.id === productId);
            const updatedProduct = { 
                ...currentProduct, 
                stock: currentProduct.stock + removedItem.quantity 
            };
            
            const response = await fetch(`https://40a6-192-248-95-64.ngrok-free.app/api/products/${productId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct)
            });

            if (!response.ok) throw new Error('Failed to restore stock');

            // Update local state
            setCart(cart.filter(item => item.id !== productId));
            setProducts(products.map(p => 
                p.id === productId ? updatedProduct : p
            ));
        } catch (err) {
            console.error('Error restoring product stock:', err);
            alert('Failed to remove item. Please try again.');
        }
    };

    // Payment Processing
    const processPayment = async (method) => {
        const received = parseFloat(amountReceived);
        if (isNaN(received) || received < cartTotal) {
            alert('Please enter sufficient amount');
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        setChange(received - cartTotal);
        setTimeout(() => {
            setCart([]);
            setAmountReceived('');
            setChange(0);
        }, 3000);
    };

    // Calculate Totals
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const balance = amountReceived ? (amountReceived - cartTotal).toFixed(2) : 0;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                    <div className="flex items-center gap-4">
                        {/* Add this image container */}
                        <div className="flex items-center">
                            <img 
                                  src={shanthaImage}  // Replace with your actual image path
                                alt="Profile"
                                className="w-20 h-20 rounded-full border-2 border-white shadow-sm"
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Shantha hardware</h1>
                            <p className="text-gray-600 mt-2">Manage your paint shop operations</p>
                        </div>
                    </div>

                    
                    <div className="flex gap-2 mt-4 md:mt-0">
                        <button
                            onClick={() => setActiveTab('pos')}
                            className={`px-4 py-2 rounded-lg ${activeTab === 'pos' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
                        >
                            <FiShoppingCart className="inline mr-2" /> POS System
                        </button>
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`px-4 py-2 rounded-lg ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
                        >
                            <FiPackage className="inline mr-2" /> Manage Products
                        </button>
                    </div>
                </div>

                {activeTab === 'pos' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4">Available Products</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {isLoading ? (
                                    <p className="text-gray-500">Loading products...</p>
                                ) : products.length === 0 ? (
                                    <p className="text-gray-500">No products available</p>
                                ) : (
                                    products.map(product => (
                                        <button
                                            key={product.id}
                                            onClick={() => addToCart(product)}
                                            disabled={product.stock === 0}
                                            className={`p-4 rounded-lg text-left ${product.stock === 0 
                                                ? 'bg-gray-100 cursor-not-allowed' 
                                                : 'bg-blue-50 hover:bg-blue-100'}`}
                                        >
                                            <h3 className="font-medium">{product.name}</h3>
                                            <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                                            <p className="text-sm mt-2">
                                                Stock: {product.stock} {product.stock < 10 && '⚠️'}
                                            </p>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-4">Current Sale</h2>
                            <div className="space-y-4">
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-sm text-gray-600">
                                                {item.quantity} × ${item.price.toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">
                                                ${(item.quantity * item.price).toFixed(2)}
                                            </span>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FiTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {cart.length === 0 && (
                                    <p className="text-gray-500 text-center py-4">No items in cart</p>
                                )}
                            </div>

                            <div className="pt-4 border-t">
                                <div className="flex justify-between mb-2">
                                    <span className="font-semibold">Subtotal:</span>
                                    <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                        Amount Received
                                    </label>
                                    <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
                                        <FiDollarSign className="text-gray-500" />
                                        <input
                                            type="text"
                                            className="w-full bg-transparent focus:outline-none"
                                            value={amountReceived}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^[0-9]*\.?[0-9]*$/.test(value)) {
                                                    setAmountReceived(value);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                <NumberPad 
                                    onInput={(input) => {
                                        if (input === 'backspace') {
                                            setAmountReceived(prev => prev.slice(0, -1));
                                        } else {
                                            setAmountReceived(prev => {
                                                if (input === '.' && prev.includes('.')) return prev;
                                                if (input === '0' && prev === '0') return prev;
                                                if (prev === '0' && input !== '.') return input;
                                                return prev + input;
                                            });
                                        }
                                    }} 
                                />

                                {amountReceived > 0 && (
                                    <div className="my-4 p-3 bg-blue-50 rounded-lg">
                                        <div className="flex justify-between">
                                            <span>Change Due:</span>
                                            <span className="font-semibold">
                                                ${balance < 0 ? '0.00' : balance}
                                            </span>
                                        </div>
                                        {change > 0 && (
                                            <div className="mt-2 text-green-600">
                                                Payment successful! Change: ${change.toFixed(2)}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-2 mt-4">
                                    <button
                                        onClick={() => processPayment('cash')}
                                        className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                                        disabled={!amountReceived || amountReceived < cartTotal}
                                    >
                                        Process Payment
                                    </button>
                                    <button
                                        onClick={() => {
                                            setCart([]);
                                            setAmountReceived('');
                                        }}
                                        className="bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                                    >
                                        Cancel Sale
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <ProductManagement products={products} setProducts={setProducts} />
                )}

                <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-4">Sales Analytics</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={products}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="stock" fill="#3B82F6" name="Current Stock" />
                                <Bar dataKey="price" fill="#10B981" name="Price" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard2;