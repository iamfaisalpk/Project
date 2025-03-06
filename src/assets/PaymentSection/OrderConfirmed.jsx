import React, { useState, useEffect } from "react";
import { useCart } from "../Cart/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrderConfirm = () => {
    const { cart, buyProducts, isLoggedIn } = useCart();
    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [newAddress, setNewAddress] = useState({ address: "", phone: "", homeName: "", addressType: "", isDefault: false });
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [formError, setFormError] = useState("");

    // Fetch addresses from API (assuming a JSON server or similar)
    useEffect(() => {
        axios.get("http://localhost:3000/addresses")
            .then((response) => {
                setAddresses(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load addresses. Please try again.");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (cart.length === 0) {
            navigate("/home");
        }
    }, [cart, navigate]);

    const handlePurchase = () => {
        if (!selectedAddress && !newAddress.address) {
            setError("Please select or enter an address.");
            return;
        }

        if (newAddress.phone && !/^\d{10}$/.test(newAddress.phone)) {
            setFormError("Please enter a valid 10-digit phone number.");
            return;
        }

        setError(""); // Clear errors
        setFormError(""); // Clear form errors

        // Proceed with purchase
        buyProducts();

        // Redirect to the order history page
        navigate("/orders");
    };

    const handleSaveAddress = () => {
        // Validate the new address form
        if (!newAddress.address || !newAddress.phone || !newAddress.homeName || !newAddress.addressType) {
            setFormError("Please fill all fields.");
            return;
        }

        setFormError(""); // Clear form error

        // If we're in edit mode, update the address
        if (editMode) {
            setAddresses(addresses.map(addr => addr.id === selectedAddress.id ? { ...addr, ...newAddress } : addr));
        } else {
            // Add the new address
            const newAddr = { ...newAddress, id: new Date().toISOString() }; // generate unique id
            setAddresses([...addresses, newAddr]);
        }

        setSelectedAddress(newAddress);
        setEditMode(false);
        setNewAddress({ address: "", phone: "", homeName: "", addressType: "", isDefault: false });
    };

    const handleEditAddress = (address) => {
        setNewAddress(address);
        setSelectedAddress(address);
        setEditMode(true);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Order Confirmation</h2>

            {!isLoggedIn ? (
                <p className="text-red-500 font-semibold">Please login to confirm your order.</p>
            ) : (
                <>
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">Review Your Order:</h3>
                        <ul className="list-disc pl-5 bg-gray-100 p-4 rounded-lg">
                            {cart.map((item) => (
                                <li key={item.id} className="my-2">
                                    {item.name} - {item.quantity} x ${item.price.toFixed(2)} 
                                    (Total: ${(item.quantity * item.price).toFixed(2)})
                                </li>
                            ))}
                        </ul>
                        <p className="font-bold mt-4 text-lg">
                            Total Amount: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                        </p>
                    </div>

                    {/* Address Selection Section */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">Select or Add Delivery Address:</h3>

                        {/* Loading and Error Handling */}
                        {loading && <p className="text-gray-500">Loading addresses...</p>}
                        {error && <p className="text-red-500">{error}</p>}

                        {/* Display Address List */}
                        {!loading && addresses.length > 0 && (
                            <div className="space-y-4">
                                {addresses.map((addr, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                        <div>
                                            <p className="font-semibold">{addr.homeName}</p>
                                            <p>{addr.address}</p>
                                            <p>{addr.phone}</p>
                                            <p>{addr.addressType}</p>
                                        </div>
                                        <div>
                                            {addr.isDefault && <span className="text-green-500 font-bold">Default</span>}
                                            <button
                                                onClick={() => handleEditAddress(addr)}
                                                className="text-blue-500 text-sm ml-4"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* New Address Form */}
                        <div className="mt-4">
                            <label className="block font-medium">Enter a New Address:</label>
                            <input
                                type="text"
                                value={newAddress.addressType}
                                onChange={(e) => setNewAddress({ ...newAddress, addressType: e.target.value })}
                                placeholder="Enter Address Type (e.g., Home, Office)"
                                className="w-full p-2 border rounded-md focus:ring focus:ring-green-400 mb-2"
                            />
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={newAddress.isDefault}
                                    onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                                    className="mr-2"
                                />
                                <label className="text-sm">Set as Default Address</label>
                            </div>
                            {formError && <p className="text-red-500 text-sm mt-2">{formError}</p>}
                            <button
                                onClick={handleSaveAddress}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                {editMode ? "Update Address" : "Save Address"}
                            </button>
                        </div>
                    </div>

                    {/* Action Section */}
                    <div className="mt-6">
                        <button
                            onClick={handlePurchase}
                            className="px-6 py-3 bg-green-500 text-white rounded-lg"
                        >
                            Confirm Order
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default OrderConfirm;

