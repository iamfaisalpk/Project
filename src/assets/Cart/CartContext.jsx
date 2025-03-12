import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Products and User Data on Mount
    useEffect(() => {
        const initializeData = async () => {
            try {
                setLoading(true);
                
                // Get data from localStorage
                const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
                const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
                const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));

                setCart(storedCart);
                setIsLoggedIn(storedIsLoggedIn);
                setUserInfo(storedUserInfo);

                // Fetch user orders if logged in
                if (storedIsLoggedIn && storedUserInfo?.id) {
                    await fetchUserOrders(storedUserInfo.id);
                }

                // Fetch products
                await fetchProducts();
                
                setLoading(false);
            } catch (err) {
                console.error("Error initializing data:", err);
                setError("Failed to load initial data. Please refresh the page.");
                setLoading(false);
            }
        };

        initializeData();
    }, []);

    // Fetch Products
    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:3000/products");
            setProducts(response.data);
            setFilteredProducts(response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching products:", error);
            setError("Failed to load products. Please try again later.");
            setFilteredProducts([]);
            return [];
        }
    };

    // Fetch Orders when userInfo changes
    useEffect(() => {
        if (userInfo?.id) {
            fetchUserOrders(userInfo.id);
        }
    }, [userInfo]);

    // Function to Fetch User Orders
    const fetchUserOrders = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/users/${userId}`);
            setOrders(response.data.orders || []);
            return response.data.orders || [];
        } catch (error) {
            console.error("Error fetching user orders:", error);
            setError("Failed to load your orders. Please try again later.");
            return [];
        }
    };

    // Filter Products Based on Search Term
    useEffect(() => {
        if (products.length > 0) {
            setFilteredProducts(
                products.filter((product) =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, products]);

    // Save Cart to Local Storage
    const saveCartToStorage = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Login User
    const login = async (user) => {
        if (!user?.id) {
            setError("Invalid user data");
            return false;
        }
        
        try {
            setIsLoggedIn(true);
            setUserInfo(user);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userInfo", JSON.stringify(user));
            await fetchUserOrders(user.id);
            return true;
        } catch (error) {
            console.error("Error during login:", error);
            setError("Login failed. Please try again.");
            return false;
        }
    };

    // Add Product to Cart
    const addToCart = (product, quantity = 1, size = "N/A") => {
        if (!isLoggedIn) {
            alert("Please login to add products to the cart.");
            return false;
        }

        try {
            const sanitizedProduct = {
                id: product.id,
                name: product.name,
                brand: product.brand || "Unknown",
                price: parseFloat(product.price),
                category: product.category || "Womens",
                image: product.image,
                description: product.description || "No description",
                size: size || product.size || "N/A",
                quantity: parseInt(quantity) || 1,
            };

            const existingItemIndex = cart.findIndex(
                (item) => item.id === sanitizedProduct.id && item.size === sanitizedProduct.size
            );

            let updatedCart;
            if (existingItemIndex > -1) {
                updatedCart = [...cart];
                updatedCart[existingItemIndex].quantity += sanitizedProduct.quantity;
            } else {
                updatedCart = [...cart, sanitizedProduct];
            }

            saveCartToStorage(updatedCart);
            return true;
        } catch (error) {
            console.error("Error adding to cart:", error);
            setError("Failed to add item to cart. Please try again.");
            return false;
        }
    };

    // Remove Product from Cart
    const removeFromCart = (productId, size = "N/A") => {
        try {
            const updatedCart = cart.filter(
                (item) => !(item.id === productId && (item.size === size))
            );
            saveCartToStorage(updatedCart);
            return true;
        } catch (error) {
            console.error("Error removing from cart:", error);
            setError("Failed to remove item from cart. Please try again.");
            return false;
        }
    };

    // Update Product Quantity
    const updateQuantity = (productId, newQuantity, size = "N/A") => {
        if (newQuantity < 1) return false;
        
        try {
            const updatedCart = cart.map(item => 
                (item.id === productId && item.size === size) ? 
                { ...item, quantity: parseInt(newQuantity) } : 
                item
            );
            
            saveCartToStorage(updatedCart);
            return true;
        } catch (error) {
            console.error("Error updating quantity:", error);
            setError("Failed to update quantity. Please try again.");
            return false;
        }
    };

    // Buy Products
    const buyProducts = async (newAddress = null) => {
        if (!isLoggedIn) {
            alert("Please login to place an order.");
            return false;
        }
        
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items before purchasing.");
            return false;
        }

        const addressToUse = newAddress || userInfo?.address;
        if (!addressToUse) {
            alert("Please provide an address to place the order.");
            return false;
        }

        try {
            const sanitizedItems = cart.map((item) => ({
                id: item.id,
                name: item.name,
                brand: item.brand,
                price: parseFloat(item.price),
                category: item.category,
                image: item.image,
                description: item.description,
                size: item.size,
                quantity: parseInt(item.quantity),
            }));

            const newOrder = {
                orderId: `ORD-${Date.now()}`,
                userId: userInfo.id,
                date: new Date().toISOString(),
                status: "Processing",
                totalAmount: sanitizedItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                ),
                items: sanitizedItems,
                address: addressToUse,
                paymentMethod: "Card",
                shippingMethod: "Standard",
            };

            const response = await axios.get(`http://localhost:3000/users/${userInfo.id}`);
            const currentUser = response.data;
            const updatedOrders = [...(currentUser.orders || []), newOrder];

            const updatedUserData = {
                ...currentUser,
                orders: updatedOrders,
                ...(newAddress && { address: newAddress }),
            };
            
            await axios.patch(`http://localhost:3000/users/${userInfo.id}`, updatedUserData);

            setOrders(updatedOrders);
            
            if (newAddress) {
                const updatedUserInfo = { ...userInfo, address: newAddress };
                setUserInfo(updatedUserInfo);
                localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
            }
            
            // Clear cart after successful purchase
            setCart([]);
            localStorage.removeItem("cart");

            alert("Your order has been placed successfully!");
            return true;
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
            return false;
        }
    };

    // Logout User
    const logout = () => {
        try {
            setIsLoggedIn(false);
            setUserInfo(null);
            setCart([]);
            setOrders([]);
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userInfo");
            localStorage.removeItem("cart");
            return true;
        } catch (error) {
            console.error("Error during logout:", error);
            setError("Logout failed. Please try again.");
            return false;
        }
    };

    // Get Cart Total
    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (parseFloat(item.price) * parseInt(item.quantity)), 0);
    };

    // Check if Product is in Cart
    const isProductInCart = (productId, size = "N/A") => {
        return cart.some(item => item.id === productId && item.size === size);
    };

    // Get Product Quantity in Cart
    const getProductQuantity = (productId, size = "N/A") => {
        const item = cart.find(item => item.id === productId && item.size === size);
        return item ? item.quantity : 0;
    };

    // Clear Cart
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    // Get Order History
    const getOrderHistory = () => {
        return orders;
    };

    // Get Order Details
    const getOrderDetails = (orderId) => {
        return orders.find(order => order.orderId === orderId);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                orders,
                isLoggedIn,
                userInfo,
                searchTerm,
                filteredProducts,
                loading,
                error,
                setSearchTerm,
                addToCart,
                removeFromCart,
                updateQuantity,
                buyProducts,
                login,
                logout,
                getCartTotal,
                isProductInCart,
                getProductQuantity,
                clearCart,
                getOrderHistory,
                getOrderDetails,
                setUserInfo,
                fetchProducts,
                fetchUserOrders
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};