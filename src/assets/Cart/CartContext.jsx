import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // New state for search term
    const [products, setProducts] = useState([]); // New state for all products (you can fetch this from an API or pass it as a prop)

    // Function to safely parse JSON from localStorage
    const safeParseJSON = (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Error parsing localStorage key "${key}":`, error);
            return null;
        }
    };

    // Load persisted data from localStorage when the component mounts
    useEffect(() => {
        setCart(safeParseJSON("cart") || []);
        setOrders(safeParseJSON("orders") || []);
        setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
        setUserInfo(safeParseJSON("userInfo") || null);
    }, []);

    // Save updated cart to localStorage
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
            // If the product already exists in the cart, update its quantity
            updatedCart = cart.map((item) =>
                item.id === product.id && item.size === product.size
                    ? { ...item, quantity: item.quantity + product.quantity }
                    : item
            );
        } else {
            // If the product is not in the cart, add it with the selected quantity
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

            const updatedOrders = [...orders, newOrder];
            setOrders(updatedOrders);
            localStorage.setItem("orders", JSON.stringify(updatedOrders));

            // Clear the cart after purchase
            setCart([]);
            localStorage.removeItem("cart");
            alert("Thank you for your purchase! Your order has been placed.");
        }
    };

    // Login user
    const login = (userDetails) => {
        setIsLoggedIn(true);
        setUserInfo(userDetails);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userInfo", JSON.stringify(userDetails));
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
        alert("You have been logged out.");
    };

    // Update user profile info
    const updateUserProfile = (newUserInfo) => {
        setUserInfo(newUserInfo);
        localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
    };

    // Cart count (total number of items in the cart)
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    // Filter products based on search term
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                searchTerm, // Provide search term to components
                setSearchTerm, // Allow components to update search term
                products, // Provide all products to components
                setProducts, // Allow components to update products
                filteredProducts, // Provide filtered
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);