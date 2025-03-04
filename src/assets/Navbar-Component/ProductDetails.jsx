import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Cart/CartContext";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart, isLoggedIn } = useCart();

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
                        <div className="mt-6">
                            <Link
                                to="/cart"
                                className={`bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition w-full ${!isLoggedIn ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => addToCart(product)}
                                disabled={!isLoggedIn}
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
        </div>
    );
};

export default ProductDetails;
