import React, { useState } from "react";
import { useCart } from "../Cart/CartContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const { userInfo, orders, logout, updateUserInfo, isLoggedIn } = useCart();
    const [editableInfo, setEditableInfo] = useState(userInfo || { name: "", email: "", address: "" });
    const [isEditing, setIsEditing] = useState(false); // Profile editing state
    const navigate = useNavigate();

    if (!isLoggedIn) {
        return <p className="text-center text-red-500">You need to log in to view and update your profile.</p>;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableInfo({ ...editableInfo, [name]: value });
    };

    const handleSaveProfile = () => {
        updateUserInfo(editableInfo); // Save updated info
        setIsEditing(false); // Exit editing mode
    };

    const handleLogout = () => {
        logout(); // Log out user
        navigate("/home"); // Redirect to homepage
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">User Profile</h2>

            {/* Profile Editing */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold">Profile Information:</h3>
                <div className="mt-4">
                    <label className="block mb-2">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={editableInfo.name}
                        onChange={handleInputChange}
                        className="block w-full border rounded mt-2 p-2"
                        disabled={!isEditing}
                    />
                </div>
                <div className="mt-4">
                    <label className="block mb-2">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={editableInfo.email}
                        onChange={handleInputChange}
                        className="block w-full border rounded mt-2 p-2"
                        disabled={!isEditing}
                    />
                </div>
                <div className="mt-4">
                    <label className="block mb-2">Shipping Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={editableInfo.address}
                        onChange={handleInputChange}
                        className="block w-full border rounded mt-2 p-2"
                        disabled={!isEditing}
                    />
                </div>
                <div className="mt-6">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <button
                            onClick={handleSaveProfile}
                            className="bg-green-500 text-white py-2 px-4 rounded-md"
                        >
                            Save Profile
                        </button>
                    )}
                </div>
            </div>

            {/* Order History */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold">Order History:</h3>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <ul className="list-disc pl-5">
                        {orders.map((order) => (
                            <li key={order.id} className="my-2">
                                <div><strong>Order ID:</strong> {order.id}</div>
                                <div><strong>Date:</strong> {order.date}</div>
                                <div><strong>Status:</strong> {order.status}</div>
                                <div><strong>Total:</strong> ${order.totalAmount}</div>
                                <div><strong>Items:</strong></div>
                                <ul className="list-inside pl-5">
                                    {order.items.map((item) => (
                                        <li key={item.productId}>
                                            {item.name} - {item.quantity} x ${item.price}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Logout */}
            <div className="mt-6">
                <button
                    onClick={handleLogout}
                    className="bg-green-400 hover:bg-red-500 text-white py-2 px-4 rounded-md cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
