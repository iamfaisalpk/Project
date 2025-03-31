import React, { useEffect, useState } from "react";
import { useCart } from "../Cart/CartContext";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
    const { orders = [], isLoggedIn } = useCart();
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            if (Array.isArray(orders)) {
                setFilteredOrders(orders);
            } else {
                setFilteredOrders([]);
            }
            setLoading(false);
        } catch (err) {
            console.error("Error processing orders:", err);
            setError("Failed to load orders.");
            setLoading(false);
        }
    }, [orders, isLoggedIn, navigate]);

    if (!isLoggedIn) {
        return <p className="text-center py-4">Please login to view your order history.</p>;
    }

    if (loading) {
        return <p className="text-center py-4">Loading your order history...</p>;
    }

    if (error) {
        return <p className="text-center py-4 text-red-500">{error}</p>;
    }

    if (!filteredOrders || filteredOrders.length === 0) {
        return <p className="text-center py-4">No orders found.</p>;
    }

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Order History</h2>
            {filteredOrders.map((order, index) => (
                <div
                    key={index} 
                    className="bg-white shadow-md rounded-md mb-4 p-4"
                    style={{ border: "1px solid #ddd" }}
                >
                    <p><strong>Order #:</strong> {`ORD-${index + 1}`}</p>
                    <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
                    <p><strong>Delivery Address:</strong> {order.address}</p>
                    <h4 className="mt-2 font-semibold">Items:</h4>
                    <div className="space-y-4 mt-2">
                        {order.items && order.items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-gray-600">Brand: {item.brand}</p>
                                    <p className="text-gray-600">Category: {item.category}</p>
                                    <p className="text-gray-600">Description: {item.description}</p>
                                    <p>{item.quantity} x ${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};


export default OrderHistory;