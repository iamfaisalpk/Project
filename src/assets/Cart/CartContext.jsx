import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [products, setProducts] = useState([]); 

    // Load persisted data from localStorage when the component mounts
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        const storedOrders = JSON.parse(localStorage.getItem("orders"));
        const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
        const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedIsLoggedIn === "true" || storedUser) {
            setIsLoggedIn(true);
        }

        if (storedCart) {
            setCart(storedCart);
        }
        if (storedOrders) {
            setOrders(storedOrders);
        }
        if (storedUserInfo || storedUser) {
            setUserInfo(storedUserInfo || storedUser);
        }
    }, []); // Only runs once when the component mounts

    // Save updated cart to storage
    const saveCartToStorage = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Add product to the cart
    const addToCart = (product) => {
        if (!isLoggedIn) {
            alert("Please login to add products to the cart.");
            return;
        }

        const existingProduct = cart.find((item) => item.id === product.id && item.size === product.size);
        let updatedCart;

        if (existingProduct) {
            updatedCart = cart.map((item) =>
                item.id === product.id && item.size === product.size
                    ? { ...item, quantity: item.quantity + product.quantity }
                    : item
            );
        } else {
            updatedCart = [...cart, { ...product, quantity: product.quantity }];
        }

        saveCartToStorage(updatedCart);
    };

    // Remove product from the cart
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        saveCartToStorage(updatedCart);
    };

    // Update product quantity in the cart
    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) {
            removeFromCart(productId);
            return;
        }

        const updatedCart = cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
        );

        saveCartToStorage(updatedCart);
    };

    // Buy products (create an order and clear cart)
    const buyProducts = () => {
        if (!isLoggedIn) {
            alert("Please login to complete your purchase.");
            return;
        }

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const confirmed = window.confirm("Are you sure you want to complete the purchase?");
        if (confirmed) {
            const newOrder = {
                id: Date.now(),
                user: userInfo,
                date: new Date().toISOString(),
                status: "Completed",
                totalAmount: cart.reduce((total, item) => total + item.price * item.quantity, 0),
                items: cart,
            };

            // Safely update orders using the previous state
            setOrders((prevOrders) => {
                const updatedOrders = [...prevOrders, newOrder]; // Create new order list
                localStorage.setItem("orders", JSON.stringify(updatedOrders)); // Update localStorage with new orders list
                return updatedOrders; // Return updated state
            });

            // Clear the cart after placing the order
            setCart([]); // Empty cart in state
            localStorage.removeItem("cart"); // Remove cart from localStorage
            alert("Thank you for your purchase! Your order has been placed.");
        }
    };

    // Login user
    const login = (userDetails) => {
        setIsLoggedIn(true);
        if (userDetails) {
            setUserInfo(userDetails);
            localStorage.setItem("userInfo", JSON.stringify(userDetails));
        }
        localStorage.setItem("isLoggedIn", "true");
    };

    // Logout user and clear all user-related data
    const logout = () => {
        setIsLoggedIn(false);
        setUserInfo(null);
        setCart([]);
        setOrders([]);
        localStorage.removeItem("cart");
        localStorage.removeItem("orders");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("user");
    };

    // Update user profile
    const updateUserProfile = (newUserInfo) => {
        setUserInfo(newUserInfo);
        localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
    };

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    const filteredProducts = products.filter((product) =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                orders,
                addToCart,
                removeFromCart,
                updateQuantity,
                buyProducts,
                isLoggedIn,
                login,
                logout,
                updateUserProfile,
                userInfo,
                setCart,
                cartCount,
                searchTerm, 
                setSearchTerm, 
                products, 
                setProducts, 
                filteredProducts, 
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);