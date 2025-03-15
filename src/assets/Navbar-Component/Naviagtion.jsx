import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useState } from 'react';
import { useCart } from '../Cart/CartContext';

const Navigation = () => {
    const [open, setOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { isLoggedIn, logout, cart, userInfo } = useCart();

    const toggleMenu = () => setOpen(!open);
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    return (
        <header className="sticky top-0 z-50">
            <nav className="bg-black flex flex-col md:flex-row items-center px-4 py-3 w-full max-w-[1400px] mx-auto">
                <div className="flex w-full md:w-auto justify-between items-center">
                    <h1 className="text-[2rem] font-semibold">
                        <Link to="/home">
                            <span className="text-white">Sneakers</span>
                            <span className="text-orange-400">World</span>
                        </Link>
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="text-orange-400 relative md:hidden">
                            <Link to="/cart">
                                <button className='cursor-pointer relative flex items-center gap-2'>
                                    <FaShoppingCart size={25} />
                                    {cart?.length > 0 && (
                                        <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {cart.length}
                                        </span>
                                    )}
                                </button>
                            </Link>
                        </div>
                        <button className="md:hidden text-white" onClick={toggleMenu}>
                            {open ? <RxCross1 size={25} /> : <GiHamburgerMenu size={25} />}
                        </button>
                    </div>
                </div>

                <div className={`w-full md:flex md:flex-1 items-center justify-center transition-all duration-300 ${
                    open ? 'block' : 'hidden md:block'
                }`}>
                    <ul className="list-none flex flex-col md:flex-row justify-center gap-6 text-white font-semibold w-full md:w-auto bg-black py-4 md:py-0">
                        <li className="hover:text-orange-400 rounded-[5px] px-3 py-2 w-full md:w-auto text-center">
                            <Link to="/home" onClick={() => setOpen(false)}>Home</Link>
                        </li>
                        <li className="hover:text-orange-400 rounded-[5px] px-3 py-2 w-full md:w-auto text-center">
                            <Link to="/products" onClick={() => setOpen(false)}>All Products</Link>
                        </li>
                        <li className="hover:text-orange-400 rounded-[5px] px-3 py-2 w-full md:w-auto text-center">
                            <Link to="/men" onClick={() => setOpen(false)}>Men</Link>
                        </li>
                        <li className="hover:text-orange-400 rounded-[5px] px-3 py-2 w-full md:w-auto text-center">
                            <Link to="/women" onClick={() => setOpen(false)}>Women</Link>
                        </li>
                    </ul>
                </div>

                <div className={`w-full md:w-auto flex flex-col md:flex-row justify-center md:justify-end items-center text-white gap-4 px-2 py-4 md:py-0 md:gap-4 ${
                    open ? 'block' : 'hidden md:flex'
                }`}>
                    {isLoggedIn ? (
                        <div className="relative w-full md:w-auto">
                            <button
                                onClick={toggleDropdown}
                                className="text-white font-semibold px-3 py-1 bg-gray-800 rounded-md hover:bg-gray-700 cursor-pointer w-full md:w-auto text-center"
                            >
                                {userInfo?.username || "User"} ▼
                            </button>

                            {showDropdown && (
                                <div className="relative md:absolute left-0 md:right-0 mt-2 w-full md:w-40 bg-white text-black shadow-md rounded-md z-30">
                                    <ul className="text-center">
                                        <li className="hover:bg-gray-200 py-2 px-4 cursor-pointer">
                                            <Link to="/orders" onClick={() => {setShowDropdown(false); setOpen(false);}}>Orders</Link>
                                        </li>
                                        <li
                                            className="hover:bg-red-500 text-white py-2 px-4 cursor-pointer bg-red-400 rounded-b-md"
                                            onClick={() => {
                                                logout();
                                                setShowDropdown(false);
                                                setOpen(false);
                                            }}
                                        >
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <li className="bg-orange-400 hover:bg-amber-500 rounded-[5px] px-3 py-1 w-full md:w-auto text-center list-none">
                            <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
                        </li>
                    )}
                    <div className="hidden md:block text-orange-400 relative">
                        <Link to="/cart">
                            <button className='cursor-pointer relative flex items-center gap-2'>
                                <FaShoppingCart size={25} />
                                {cart?.length > 0 && (
                                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {cart.length}
                                    </span>
                                )}
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};
    
export default Navigation;