import { useEffect, useState } from "react";
import { useCart } from "../Cart/CartContext";


const OrderHistory = () => {
    const { orders, isLoggedIn } = useCart();
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        if (isLoggedIn) {
            setFilteredOrders(orders);
        }
    }, [orders, isLoggedIn]);

    if (!isLoggedIn) {
        return <p>Please login to view your order history.</p>;
    }

    if (filteredOrders.length === 0) {
        return <p>No orders found.</p>;
    }

    return (
        <div>
            <h2>Order History</h2>
            {filteredOrders.map((order) => (
                <div key={order.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Date:</strong> {order.date}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
                    <h4>Items:</h4>
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
