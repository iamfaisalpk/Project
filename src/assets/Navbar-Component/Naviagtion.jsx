import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useState } from 'react';
import { useCart } from '../Cart/CartContext';

const Navigation = ({ setSearchQuery }) => {  // Adding setSearchQuery as a prop
    const [open, setOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { isLoggedIn, logout, cart, userInfo } = useCart();

    const toggleMenu = () => setOpen(!open);
    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);  // Pass the search query to parent component
    };

    return (
        <header>
            <nav className="bg-black flex justify-between items-center px-4 py-3 relative">
                <h1 className="text-[2rem] font-semibold">
                    <Link to="/home">
                        <span className="text-white">Sneakers</span>
                        <span className="text-orange-400">World</span>
                    </Link>
                </h1>

                
                <ul className={`list-none md:flex justify-end gap-4 text-white font-semibold mt-3.5 ${open ? 'block' : 'hidden'} md:block`}>
                    <li className="hover:text-orange-400 rounded-[5px] px-2 py-1">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="hover:text-orange-400 rounded-[5px] px-2 py-1">
                        <Link to="/products">All Products</Link>
                    </li>
                    <li className="hover:text-orange-400 rounded-[5px] px-2 py-1">
                        <Link to="/men">Men</Link>
                    </li>
                    <li className="hover:text-orange-400 rounded-[5px] px-2 py-1">
                        <Link to="/women">Women</Link>
                    </li>
                </ul>

                
                {/* User-related Links */}
                <div className="list-none flex justify-evenly text-white gap-3 mt-3.5 mr-0 md:mr-[50px] relative">
                    {isLoggedIn ? (
                        <>
                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    className="text-white font-semibold px-3 py-1 bg-gray-800 rounded-md hover:bg-gray-700 cursor-pointer"
                                >
                                    {userInfo?.username || "User"} ▼
                                </button>

                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-md rounded-md z-30">
                                        <ul className="text-center">
                                            <li className="hover:bg-gray-200 py-2 px-4 cursor-pointer">
                                                <Link to="/orders">Orders</Link>
                                            </li>
                                            <li
                                                className="hover:bg-red-500 text-white py-2 px-4 cursor-pointer bg-red-400 rounded-b-md"
                                                onClick={logout}
                                            >
                                                Logout
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <li className="hover:bg-orange-400 rounded-[5px] px-3 py-1">
                            <Link to="/login">Login</Link>
                        </li>
                    )}

                    {/* Shopping Cart */}
                    <li className="text-orange-400 ">
                        <Link to="/cart">
                            <button className='cursor-pointer'>
                                <FaShoppingCart size={25} />
                            </button>
                        </Link>
                    </li>
                </div>
                
            </nav>
        </header>
    );
};

export default Navigation;
