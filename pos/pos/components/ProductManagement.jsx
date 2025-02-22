import { useState } from 'react';
import { FiPlus, FiTrash, FiEdit, FiCheck, FiX } from 'react-icons/fi';

const ProductManagement = ({ products, setProducts }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: 'Paints'
  });
  const [editingId, setEditingId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateForm = () => {
    const errors = {};
    const price = parseFloat(newProduct.price);
    const stock = parseInt(newProduct.stock, 10);

    if (!newProduct.name.trim()) errors.name = 'Name is required';
    if (isNaN(price) || price <= 0) errors.price = 'Price must be positive';
    if (isNaN(stock) || stock < 0) errors.stock = 'Stock cannot be negative';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock, 10),
          category: newProduct.category
        })
      });

      if (!response.ok) throw new Error('Failed to add product');
      
      const addedProduct = await response.json();
      setProducts([...products, addedProduct]);
      setNewProduct({ name: '', price: '', stock: '', category: 'Paints' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setNewProduct({
      ...product,
      price: product.price.toString(),
      stock: product.stock.toString()
    });
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/products/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock, 10),
          category: newProduct.category
        })
      });

      if (!response.ok) throw new Error('Failed to update product');
      
      const updatedProduct = await response.json();
      setProducts(products.map(p => p.id === editingId ? updatedProduct : p));
      setEditingId(null);
      setNewProduct({ name: '', price: '', stock: '', category: 'Paints' });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete product');
      
      setProducts(products.filter(p => p.id !== productId));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return 'text-red-500';
    if (stock < 5) return 'text-yellow-500';
    return 'text-green-500';
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add/Edit Product Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h2>
          
          {showSuccess && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
              Product {editingId ? 'updated' : 'added'} successfully!
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
              Error: {error}
            </div>
          )}

          <form onSubmit={editingId ? handleUpdate : handleAddProduct} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                className={`w-full p-3 border-2 rounded-lg peer ${validationErrors.name ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 outline-none`}
                value={newProduct.name}
                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
              />
              <label className={`absolute left-3 transition-all duration-200 pointer-events-none
                ${newProduct.name ? 'top-0 text-sm text-blue-500 bg-white px-1' : 'top-3.5 text-gray-500'}
                peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white peer-focus:px-1`}>
                Product Name
              </label>
              {validationErrors.name && (
                <span className="text-red-500 text-sm mt-1">{validationErrors.name}</span>
              )}
            </div>

            <div className="relative">
              <input
                type="number"
                step="0.01"
                className={`w-full p-3 border-2 rounded-lg peer ${validationErrors.price ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 outline-none`}
                value={newProduct.price}
                onChange={e => setNewProduct({...newProduct, price: e.target.value})}
              />
              <label className={`absolute left-3 transition-all duration-200 pointer-events-none
                ${newProduct.price ? 'top-0 text-sm text-blue-500 bg-white px-1' : 'top-3.5 text-gray-500'}
                peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white peer-focus:px-1`}>
                Price ($)
              </label>
              {validationErrors.price && (
                <span className="text-red-500 text-sm mt-1">{validationErrors.price}</span>
              )}
            </div>

            <div className="relative">
              <input
                type="number"
                className={`w-full p-3 border-2 rounded-lg peer ${validationErrors.stock ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 outline-none`}
                value={newProduct.stock}
                onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
              />
              <label className={`absolute left-3 transition-all duration-200 pointer-events-none
                ${newProduct.stock ? 'top-0 text-sm text-blue-500 bg-white px-1' : 'top-3.5 text-gray-500'}
                peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-white peer-focus:px-1`}>
                Stock Quantity
              </label>
              {validationErrors.stock && (
                <span className="text-red-500 text-sm mt-1">{validationErrors.stock}</span>
              )}
            </div>

            <div className="relative">
              <select
                className="w-full p-3 border-2 border-gray-200 rounded-lg appearance-none focus:border-blue-500 outline-none"
                value={newProduct.category}
                onChange={e => setNewProduct({...newProduct, category: e.target.value})}
              >
                <option value="Paints">Paints</option>
                <option value="Tools">Tools</option>
                <option value="Supplies">Supplies</option>
              </select>
              <div className="absolute right-3 top-4 text-gray-500 pointer-events-none">
                ▼
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2 transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <span className="animate-spin">⏳</span>
                ) : editingId ? (
                  <>
                    <FiCheck /> Update Product
                  </>
                ) : (
                  <>
                    <FiPlus /> Add Product
                  </>
                )}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setNewProduct({ name: '', price: '', stock: '', category: 'Paints' });
                  }}
                  className="bg-gray-200 text-gray-700 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <FiX />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Product Inventory */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Product Inventory</h2>
          
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Product</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Category</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Price</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Stock</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr 
                    key={product.id}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4 font-medium">{product.name}</td>
                    <td className="py-4 px-4">
                      <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">${product.price.toFixed(2)}</td>
                    <td className={`py-4 px-4 font-medium ${getStockStatus(product.stock)}`}>
                      {product.stock}
                    </td>
                    <td className="py-4 px-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this product?')) {
                            setProducts(products.filter(p => p.id !== product.id));
                          }
                        }}
                        className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <FiTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {products.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No products found. Start by adding your first product!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;