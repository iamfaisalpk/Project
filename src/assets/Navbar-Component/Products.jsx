import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Cart/CartContext";

const ProductList = () => {
    const { cart, addToCart, removeFromCart, isLoggedIn, searchTerm, setSearchTerm, filteredProducts } = useCart();

    const isInCart = (productId) => cart.some((item) => item.id === productId);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-6">Our Products</h1>

            {/* Search Bar */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Product List */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <li key={product.id} className="bg-white p-4 rounded-lg shadow-lg transition hover:scale-105">
                        <Link to={`/products/${product.id}`}>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-lg hover:opacity-80 transition"
                            />
                        </Link>
                        <h3 className="text-lg font-bold mt-2">{product.name}</h3>
                        <p className="text-gray-600">Price: ${product.price}</p>

                        {isInCart(product.id) ? (
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full mt-2"
                                onClick={() => removeFromCart(product.id)}
                            >
                                Remove from Cart
                            </button>
                        ) : (
                            <button
                                className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full mt-2 ${!isLoggedIn ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => addToCart(product)}
                                disabled={!isLoggedIn}
                            >
                                Add to Cart
                            </button>
                        )}

                        <Link
                            to="/cart"
                            className="block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full text-center mt-2"
                        >
                            View Cart
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;