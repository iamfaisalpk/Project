import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';

const OrderConfirmed = () => {
    const { setCart } = useCart(); // Get setCart function from context
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const totalPrice = queryParams.get('total') || "0.00";

    // Clear cart after order confirmation
    useEffect(() => {
        setCart([]); // Clear cart state
        localStorage.removeItem('cart'); // Remove cart from local storage
    }, [setCart]);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-4">Order Confirmed!</h1>
                <p className="text-lg text-gray-700 mb-2">Thank you for your purchase.</p>
                <p className="text-lg font-semibold text-gray-900 mb-6">
                    Total Paid: <span className="text-green-600">${totalPrice}</span>
                </p>
                <Link
                    to="/home"
                    className="bg-green-500 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirmed;
