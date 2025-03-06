import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Cart/CartContext";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart, isLoggedIn, cartCount } = useCart();
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1); // State for quantity

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then((response) => setProduct(response.data))
            .catch(() => console.error("Error fetching product details"));
    }, [id]);

    if (!product) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex justify-center">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-80 object-cover rounded-lg shadow-md"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                        <p className="text-lg text-gray-600 mt-2">{product.description}</p>
                        <p className="text-2xl font-semibold text-green-600 mt-4">Price: ${product.price}</p>

                        {/* Size Selection */}
                        <div className="mt-4">
                            <label htmlFor="size" className="block text-sm font-medium text-gray-700">Select Size:</label>
                            <select
                                id="size"
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Size</option>
                                {product.size.map((size) => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                        </div>

                        {/* Quantity Selection */}
                        <div className="mt-4">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity:</label>
                            <div className="mt-1 flex items-center">
                                <button
                                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                                    className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    id="quantity"
                                    value={quantity}
                                    min="1"
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                                    className="w-16 text-center px-3 py-1 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    onClick={() => setQuantity((prev) => prev + 1)}
                                    className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                to="/cart"
                                className={`bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition w-full text-center block ${!isLoggedIn || !selectedSize ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => addToCart({ ...product, size: selectedSize, quantity })}
                                disabled={!isLoggedIn || !selectedSize}
                            >
                                Add to Cart
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <Link
                        to="/products"
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                        Back to Products
                    </Link>
                </div>
            </div>

            {/* Display Cart Count */}
            {/* <div className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg shadow-lg">
                {cartCount}
            </div> */}
        </div>
    );
};

export default ProductDetails;