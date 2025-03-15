import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Cart/CartContext";

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, buyProducts } = useCart();

    
    const totalPrice = cart.reduce((total, product) => total + (product.price * product.quantity), 0);

    const handleRemoveFromCart = (productId, size) => {
        if (window.confirm("Are you sure you want to remove this item?")) {
            removeFromCart(productId, size);
        }
    };

    const handleQuantityUpdate = (productId, newQuantity) => {
        if (newQuantity > 0) {
            updateQuantity(productId, newQuantity);
        }
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items before proceeding to payment.");
            return;
        }
        buyProducts();
    };

    return (
        <div className="container mx-auto mt-10">
            <div className="flex flex-col md:flex-row shadow-md my-10">
                <div className="w-full md:w-3/4 bg-white px-6 md:px-10 py-10">
                    <div className="flex justify-between border-b pb-8">
                        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                        <h2 className="font-semibold text-2xl">{cart.length} Items</h2>
                    </div>
                    {cart.length === 0 ? (
                        <div className="text-center py-10">
                            <h2 className="text-xl font-semibold">Your cart is empty</h2>
                            <Link to="/products" className="inline-block text-white mt-4 bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition">Continue Shopping</Link>
                        </div>
                    ) : (
                        <>
                            <div className="hidden md:flex mt-10 mb-5">
                                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
                                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
                                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
                            </div>
                            {cart.map((product) => (
                                <div className="flex flex-col md:flex-row items-center hover:bg-gray-100 -mx-8 px-6 py-5" key={product.id}>
                                    <div className="flex w-full md:w-2/5">
                                        <div className="w-20">
                                            <img className="h-24 object-contain" src={product.image} alt={product.name} />
                                        </div>
                                        <div className="flex flex-col justify-between ml-4 flex-grow">
                                            <span className="font-bold text-sm">{product.name}</span>
                                            <span className="text-red-500 text-xs">{product.brand}</span>
                                            {product.size && product.size !== "N/A" && (
                                                <span className="text-gray-500 text-xs">Size: {product.size}</span>
                                            )}
                                            <button
                                                onClick={() => handleRemoveFromCart(product.id, product.size)}
                                                className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex justify-center w-full md:w-1/5 mt-4 md:mt-0">
                                        <button
                                            onClick={() => handleQuantityUpdate(product.id, product.quantity - 1)}
                                            disabled={product.quantity <= 1}
                                            className={`px-2 py-1 border rounded ${product.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                                        >
                                            -
                                        </button>
                                        <input
                                            className="mx-2 border text-center w-8"
                                            type="text"
                                            value={product.quantity}
                                            readOnly
                                        />
                                        <button 
                                            onClick={() => handleQuantityUpdate(product.id, product.quantity + 1)}
                                            className="px-2 py-1 border rounded hover:bg-gray-200"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="text-center w-full md:w-1/5 font-semibold text-sm mt-4 md:mt-0">${product.price.toFixed(2)}</span>
                                    <span className="text-center w-full md:w-1/5 font-semibold text-sm mt-2 md:mt-0">${(product.price * product.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <Link to="/products" className="flex font-semibold text-indigo-600 text-sm mt-10">
                                <svg
                                    className="fill-current mr-2 text-indigo-600 w-4"
                                    viewBox="0 0 448 512"
                                >
                                    <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                                </svg>
                                Continue Shopping
                            </Link>
                        </>
                    )}
                </div>
                {cart.length > 0 && (
                    <div id="summary" className="w-full md:w-1/4 px-8 py-10 bg-gray-50">
                        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                        <div className="flex justify-between mt-10 mb-5">
                            <span className="font-semibold text-sm uppercase">Items {cart.length}</span>
                            <span className="font-semibold text-sm">${totalPrice.toFixed(2)}</span>
                        </div>
                        <div>
                            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                            <select className="block p-2 text-gray-600 w-full text-sm">
                                <option>Standard shipping - $10.00</option>
                                <option>Express shipping - $20.00</option>
                            </select>
                        </div>
                        <div className="border-t mt-8">
                            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span>Total cost</span>
                                <span>${(totalPrice + 10).toFixed(2)}</span>
                            </div>
                            <Link
                                to="/payment"
                                className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300 w-full block text-center"
                                onClick={handleCheckout}
                            >
                                Proceed to Payment
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
