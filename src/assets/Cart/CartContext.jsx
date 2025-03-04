import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Load user login status and cart from localStorage when the component mounts
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const userStatus = localStorage.getItem("isLoggedIn") === "true";

        setCart(storedCart);
        setIsLoggedIn(userStatus);
    }, []);

    // Add product to the cart
    const addToCart = (product) => {
        if (!isLoggedIn) {
            alert("Please login to add products to the cart.");
            return;
        }

        const existingProduct = cart.find((item) => item.id === product.id);
        let updatedCart;

        if (existingProduct) {
            updatedCart = cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedCart = [...cart, { ...product, quantity: 1 }];
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Remove product from the cart
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Update product quantity in the cart
    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        const updatedCart = cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
        );

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Buy products (clear cart after purchase)
    const buyProducts = () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const confirmed = window.confirm("Are you sure you want to complete the purchase?");
        if (confirmed) {
            alert("Thank you for your purchase! Your cart will be cleared.");
            setCart([]);
            localStorage.removeItem("cart");
        }
    };

    // Login user
    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true"); // Save login status to localStorage
    };

    // Logout user and clear cart
    const logout = () => {
        setIsLoggedIn(false);
        setCart([]);
        localStorage.removeItem("cart"); // Clear cart from localStorage
        localStorage.removeItem("isLoggedIn"); // Remove login status from localStorage
        alert("You have been logged out.");
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                buyProducts,
                isLoggedIn,
                login,
                logout,
                setCart, // Ensure setCart is available for components like OrderConfirmed
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
