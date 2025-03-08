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

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));

        setIsLoggedIn(storedIsLoggedIn);
        setCart(storedCart);
        setUserInfo(storedUserInfo);

        if (storedUserInfo) {
            axios.get(`http://localhost:3000/users/${storedUserInfo.id}`)
                .then(response => setOrders(response.data.orders || []))
                .catch(error => console.error("Error fetching user orders:", error));
        }

        axios.get("http://localhost:3000/products")
            .then((response) => {
                setProducts(response.data);
                setFilteredProducts(response.data);
            })
            .catch(() => console.error("Error fetching products"));
    }, []);

    useEffect(() => {
        setFilteredProducts(
            products.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, products]);

    const saveCartToStorage = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const addToCart = (product) => {
        if (!isLoggedIn) {
            alert("Please login to add products to the cart.");
            return;
        }
        const sanitizedProduct = {
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            category: product.category,
            image: product.image,
            description: product.description,
            quantity: 1,
        };
        const updatedCart = [...cart, sanitizedProduct];
        saveCartToStorage(updatedCart);
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        saveCartToStorage(updatedCart);
    };

    const buyProducts = async (newAddress = null) => {
        if (!isLoggedIn || cart.length === 0) {
            alert("Please login and add items to cart before purchasing.");
            return;
        }

        const addressToUse = newAddress || userInfo?.address;
        if (!addressToUse) {
            alert("Please provide an address to place the order.");
            return;
        }

        const sanitizedItems = cart.map(item => ({
            id: item.id,
            name: item.name,
            brand: item.brand,
            price: item.price,
            category: item.category,
            image: item.image,
            description: item.description,
            quantity: item.quantity,
        }));

        const newOrder = {
            userId: userInfo.id,
            date: new Date().toISOString(),
            status: "Completed",
            totalAmount: sanitizedItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0),
            items: sanitizedItems,
            address: addressToUse,
        };

        try {
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
            setCart([]);
            localStorage.removeItem("cart");

            alert("Your order has been placed successfully!");
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserInfo(null);
        setCart([]);
        setOrders([]);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("cart");
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                orders,
                addToCart,
                removeFromCart,
                buyProducts,
                isLoggedIn,
                userInfo,
                setUserInfo,
                searchTerm,
                setSearchTerm,
                filteredProducts,
                setFilteredProducts,
                logout,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
