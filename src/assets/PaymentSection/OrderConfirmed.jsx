import React, { useEffect } from "react";
import { useCart } from "../Cart/CartContext";
import { useNavigate } from "react-router-dom"; // To redirect after confirmation

const OrderConfirm = () => {
    const { cart, buyProducts, isLoggedIn } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        if (cart.length === 0) {
            navigate("/home");
        }
    }, [cart, navigate]);

    const handlePurchase = () => {
        buyProducts();
        // After purchase, redirect to the Order History page
        navigate("/profile/orders");
    };

    if (!isLoggedIn) {
        return <p>Please login to confirm your order.</p>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Order Confirmation</h2>
            <div className="mb-6">
                <h3 className="text-xl font-semibold">Review Your Order:</h3>
                <ul className="list-disc pl-5">
                    {cart.map((item) => (
                        <li key={item.id} className="my-2">
                            {item.name} - {item.quantity} x ${item.price.toFixed(2)} (Total: ${(item.quantity * item.price).toFixed(2)})
                        </li>
                    ))}
                </ul>
                <p className="font-bold mt-4">
                    Total Amount: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </p>
            </div>
            <div>
                <button
                    onClick={handlePurchase}
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                >
                    Confirm Purchase
                </button>
            </div>
        </div>
    );
};

export default OrderConfirm;
