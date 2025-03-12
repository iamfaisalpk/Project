import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../Cart/CartContext";

const Women = () => {
    const [products, setProducts] = useState([]);
    const { cart, addToCart, removeFromCart } = useCart();

    useEffect(() => {
        axios
            .get("http://localhost:3000/womens")
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const isInCart = (productId, size = "N/A") =>
        cart.some((item) => item.id === productId && item.size === size);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-6">Our Products</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => {
                    const defaultSize = product.size?.[0] || "N/A"; 
                    return (
                        <li
                            key={product.id}
                            className="bg-white p-4 rounded-lg shadow-lg transition hover:scale-105"
                        >
                            <Link to={`/products/${product.id}`}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-lg hover:opacity-80 transition"
                                />
                            </Link>
                            <h3 className="text-lg font-bold mt-2">{product.name}</h3>
                            <p className="text-gray-600">Price: ${product.price}</p>

                            {isInCart(product.id, defaultSize) ? (
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full mt-2"
                                    onClick={() => removeFromCart(product.id, defaultSize)}
                                >
                                    Remove from Cart
                                </button>
                            ) : (
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full mt-2"
                                    onClick={() =>
                                        addToCart({ ...product, size: defaultSize, quantity: 1 })
                                    }
                                >
                                    Add to Cart
                                </button>
                            )}

                            <Link
                                to="/cart"
                                className="block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full text-center mt-2"
                            >
                                Go to Cart
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Women;