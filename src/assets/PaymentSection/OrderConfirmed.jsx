import React, { useState, useEffect } from "react";
import { useCart } from "../Cart/CartContext";
import { useNavigate } from "react-router-dom";

const OrderConfirm = () => {
    const { cart, buyProducts, isLoggedIn, userInfo } = useCart();
    const navigate = useNavigate();
    const [selectedAddress, setSelectedAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [houseName, setHouseName] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [streetAddress, setStreetAddress] = useState("");

    useEffect(() => {
        if (cart.length === 0) {
            navigate("/home");
        }
    }, [cart, navigate]);

    useEffect(() => {
        if (userInfo && userInfo.address) {
            setSelectedAddress(userInfo.address);
            const parts = userInfo.address.split(", ");
            if (parts.length === 4) {
                setHouseName(parts[0]);
                setStreetAddress(parts[1]);
                setPinCode(parts[2]);
                setPhoneNumber(parts[3]);
            }
        }
    }, [userInfo]);

    const handlePurchase = () => {
        const addressToUse = selectedAddress || combineAddress();
        if (!addressToUse.trim()) {
            alert("Please fill in all address fields to proceed.");
            return;
        }

        buyProducts(addressToUse !== userInfo?.address ? addressToUse : null);
        navigate("/orders");
    };

    const combineAddress = () => {
        if (!phoneNumber || !houseName || !pinCode || !streetAddress) {
            return "";
        }
        return `${houseName}, ${streetAddress}, ${pinCode}, ${phoneNumber}`;
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Order Confirmation</h2>

            {!isLoggedIn ? (
                <p className="text-red-500 font-semibold">Please login to confirm your order.</p>
            ) : (
                <>
                    <h3 className="text-xl font-semibold mb-2">Review Your Order:</h3>
                    <div className="bg-gray-100 p-4 rounded-lg space-y-4">
                        {cart.map((item) => (
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
                                    <p>{item.quantity} x ${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="font-bold mt-4 text-lg">
                        Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                    </p>

                    <h3 className="text-xl font-semibold mt-6">Delivery Address:</h3>
                    {userInfo?.address ? (
                        <div className="p-4 border rounded-lg my-2">
                            <p>{userInfo.address}</p>
                        </div>
                    ) : (
                        <div className="my-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">House Name:</label>
                                <input
                                    type="text"
                                    value={houseName}
                                    onChange={(e) => setHouseName(e.target.value)}
                                    placeholder="e.g., Rose Villa"
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Street Address:</label>
                                <input
                                    type="text"
                                    value={streetAddress}
                                    onChange={(e) => setStreetAddress(e.target.value)}
                                    placeholder="e.g., 123 Main St, City"
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Pin Code:</label>
                                <input
                                    type="text"
                                    value={pinCode}
                                    onChange={(e) => setPinCode(e.target.value)}
                                    placeholder="e.g., 123456"
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Phone Number:</label>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="e.g., 123-456-7890"
                                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handlePurchase}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition mt-4"
                    >
                        Confirm and Place Order
                    </button>
                </>
            )}
        </div>
    );
};


export default OrderConfirm;