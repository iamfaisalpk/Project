import React, { useEffect, useState } from "react";
import { useCart } from "../Cart/CartContext";

const OrderHistory = () => {
    const { orders = [], isLoggedIn } = useCart();
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

    useEffect(() => {
        if (isLoggedIn) {
            setLoading(true);
            try {
                // Safely handle the orders data
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
        } else {
            setFilteredOrders([]);
            setLoading(false);
        }
    }, [orders, isLoggedIn]);

    // Early return patterns
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
            {filteredOrders.map((order) => (
                <div
                    key={order.id}
                    className="bg-white shadow-md rounded-md mb-4 p-4"
                    style={{ border: "1px solid #ddd" }}
                >
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
                    <h4 className="mt-2 font-semibold">Items:</h4>
                    <ul className="list-disc pl-5 mt-2">
                        {order.items && order.items.map((item) => (
                            <li key={item.productId} className="mb-1">
                                {item.name} - {item.quantity} x ${item.price}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;