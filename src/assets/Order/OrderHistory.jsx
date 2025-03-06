import React, { useEffect, useState } from "react";
import { useCart } from "../Cart/CartContext";

const OrderHistory = () => {
    const { orders, isLoggedIn } = useCart();
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

    useEffect(() => {
        if (isLoggedIn) {
            setLoading(true);
            try {
                // Assuming orders are already loaded in the context or localStorage
                setFilteredOrders(orders);
                setLoading(false);
            } catch (err) {
                setError("Failed to load orders.");
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, [orders, isLoggedIn]);

    if (!isLoggedIn) {
        return <p>Please login to view your order history.</p>;
    }

    if (loading) {
        return <p>Loading your order history...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (filteredOrders.length === 0) {
        return <p>No orders found.</p>;
    }

    return (
        <div>
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
                    <ul>
                        {order.items.map((item) => (
                            <li key={item.productId}>
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
