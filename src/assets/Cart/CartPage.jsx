import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Cart/CartContext";

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, buyProducts } = useCart();

    const totalPrice = cart.reduce((total, product) => total + (product.price * product.quantity), 0);

    return (
        <div className="container mx-auto mt-10">
            <div className="flex shadow-md my-10">
                <div className="w-3/4 bg-white px-10 py-10">
                    <div className="flex justify-between border-b pb-8">
                        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                        <h2 className="font-semibold text-2xl">{cart.length} Items</h2>
                    </div>
                    {cart.length === 0 ? (
                        <div className="text-center py-10">
                            <h2 className="text-xl font-semibold">Your cart is empty</h2>
                            <Link to="/products" className="text-white mt-4 block bg-blue-400">Continue Shopping</Link>
                        </div>
                    ) : (
                        <>
                            <div className="flex mt-10 mb-5">
                                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
                                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
                                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
                            </div>
                            {cart.map((product) => (
                                <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" key={product.id}>
                                    <div className="flex w-2/5">
                                        <div className="w-20">
                                            <img className="h-24" src={product.image} alt={product.name} />
                                        </div>
                                        <div className="flex flex-col justify-between ml-4 flex-grow">
                                            <span className="font-bold text-sm">{product.name}</span>
                                            <span className="text-red-500 text-xs">{product.brand}</span>
                                            <button
                                                onClick={() => removeFromCart(product.id)}
                                                className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex justify-center w-1/5">
                                        <button
                                            onClick={() => updateQuantity(product.id, product.quantity - 1)}
                                            disabled={product.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <input
                                            className="mx-2 border text-center w-8"
                                            type="text"
                                            value={product.quantity}
                                            readOnly
                                        />
                                        <button onClick={() => updateQuantity(product.id, product.quantity + 1)}>+</button>
                                    </div>
                                    <span className="text-center w-1/5 font-semibold text-sm">${product.price}</span>
                                    <span className="text-center w-1/5 font-semibold text-sm">${(product.price * product.quantity).toFixed(2)}</span>
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
                    <div id="summary" className="w-1/4 px-8 py-10">
                        <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                        <div className="flex justify-between mt-10 mb-5">
                            <span className="font-semibold text-sm uppercase">Items {cart.length}</span>
                            <span className="font-semibold text-sm">${totalPrice.toFixed(2)}</span>
                        </div>
                        <div>
                            <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                            <select className="block p-2 text-gray-600 w-full text-sm">
                                <option>Standard shipping - $10.00</option>
                            </select>
                        </div>
                        {/* <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button> */}
                        <div className="border-t mt-8">
                            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                                <span>Total cost</span>
                                <span>${(totalPrice + 10).toFixed(2)}</span>
                            </div>
                            <Link
                                to="/payment"
                                className="bg-green-500 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
                                onClick={buyProducts}
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
