import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Editproducts = () => {
const { id } = useParams();
const navigate = useNavigate();
const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    imageUrl: '', 
});
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    fetchProduct();
}, [id]);

const fetchProduct = async () => {
    try {
    setLoading(true);
    const response = await axios.get(`http://localhost:3000/products/${id}`);
    setProduct(response.data);
    setError(null);
    } catch (err) {
    setError('Failed to fetch product details');
    console.error(err);
    } finally {
    setLoading(false);
    }
};

const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
    ...prev,
    [name]: name === 'price' ? Number(value) : value,
    }));
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    setLoading(true);
    const response = await axios.put(`http://localhost:3000/products/${id}`, product);
    if (response.status === 200) {
        alert('Product updated successfully!');
        navigate('/admin/products');
    }
    } catch (err) {
    setError('Failed to update product');
    console.error(err);
    } finally {
    setLoading(false);
    }
};

    const handleCancel = () => {
    navigate('/admin/products');
};

return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h1>

    {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
            />
        </svg>
        {error}
        </div>
    )}

    {loading && (
        <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
        <span className="text-gray-600 mt-4 block">Loading product details...</span>
        </div>
)}

    {!loading && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
            </label>
            <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter product name"
            required
            />
        </div>

        <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price
            </label>
            <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter price"
            required
            />
        </div>

        <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
            </label>
            <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter product description"
            rows="4"
            />
        </div>

        <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
            </label>
            <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter category"
            required
            />
        </div>

        <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
            </label>
            <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
            />
            {product.imageUrl && (
            <div className="mt-2">
                <img
                src={product.imageUrl}
                alt="Product preview"
                className="max-w-xs h-auto rounded-lg shadow-md"
                  onError={(e) => (e.target.style.display = 'none')} // Hide broken images
                />
            </div>
            )}
        </div>

        <div className="flex gap-4 justify-end">
            <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            disabled={loading}
            >
            Cancel
            </button>
            <button
            type="submit"
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:bg-orange-400"
            disabled={loading}
            >
            {loading ? 'Updating...' : 'Update Product'}
            </button>
        </div>
        </form>
    )}
    </div>
);
};

export default Editproducts;