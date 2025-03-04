import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { useState } from 'react';
import { useCart } from '../Cart/CartContext'; // Import useCart

const Naviagation = () => {
    const [open, setOpen] = useState(false);
    const { isLoggedIn, logout } = useCart(); // Use isLoggedIn and logout from CartContext

    const ThreelineChange = () => {
        setOpen(!open);
    };

    return (
        <header>
            <nav className="bg-black flex justify-between relative">
                {/* Heading Area */}
                <h1 className="text-[2rem] font-semibold px-3">
                    <Link to="/home">
                        <span className="text-white">Sneakers</span>
                        <span className="text-orange-400">World</span>
                    </Link>
                </h1>

                {/* Home Product Links */}
                <ul className="justify-end gap-4 text-white mt-3.5 ml-14 font-semibold hidden md:flex">
                    <li className="hover:bg-orange-400 rounded-[5px] px-1 size-fit">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="hover:bg-orange-400 rounded-[5px] px-1 size-fit">
                        <Link to="/products">All Products</Link>
                    </li>
                    <li className="hover:bg-orange-400 rounded-[5px] px-1 size-fit">
                        <Link to="/men">Men</Link>
                    </li>
                    <li className="hover:bg-orange-400 rounded-[5px] px-1 size-fit">
                        <Link to="/women">Women</Link>
                    </li>
                </ul>

                {/* Responsive Home Products Links */}
                {open && (
                    <div>
                        <ul className="flex flex-col gap-10 text-2xl absolute top-[77px] left-0 h-screen w-full z-10 bg-orange-400 items-center text-white justify-center font-semibold">
                            <li className="hover:bg-orange-400 rounded-[5px] px-1 size-fit mt-5">
                                <Link to="/home">Home</Link>
                            </li>
                            <li className="hover:bg-orange-400 rounded-[5px] px-1 size-fit mt-5">
                                <Link to="/products">All Products</Link>
                            </li>
                            <li className="hover:bg-orange-400 rounded-[5px] px-1 size-fit mt-5">
                                <Link to="/men">Men</Link>
                            </li>
                            <li className="hover:bg-orange-400 rounded-[5px] px-1 size-fit mt-5">
                                <Link to="/women">Women</Link>
                            </li>
                        </ul>
                        <button className="absolute top-[77px] z-10 right-0 text-white py-2 px-4 cursor-pointer">
                            <RxCross1 size={25} onClick={ThreelineChange} />
                        </button>
                    </div>
                )}

                {/* Login, Register, and Cart Links */}
                <div className="flex justify-evenly text-white list-none gap-3.5 mt-3.5 mr-0 md:mr-[50px]">
                    {isLoggedIn ? (
                        // Show Logout button if user is logged in
                        <li className="bg-red-500 rounded-[5px] px-1 size-fit hover:bg-red-600">
                            <button onClick={logout}>Logout</button>
                        </li>
                    ) : (
                        // Show Login and Create Account buttons if user is not logged in
                        <>
                            <li className="bg-orange-400 rounded-[5px] px-1 size-fit hover:bg-amber-600 animate-bounce">
                                <Link to="/Reg">Create Account</Link>
                            </li>
                            <li className="hover:bg-orange-400 rounded-[5px] px-1 size-fit">
                                <Link to="/login">Login</Link>
                            </li>
                        </>
                    )}
                    <li className="text-orange-400 cursor-pointer mr-3">
                        <Link to="/cart">
                            <button className="cursor-pointer">
                                <FaShoppingCart size={25} />
                            </button>
                        </Link>
                    </li>
                    {!open && (
                        <li className="text-orange-400 cursor-pointer mr-3">
                            <button className="md:hidden" onClick={ThreelineChange}>
                                <GiHamburgerMenu size={25} />
                            </button>
                        </li>
                    )}
                </div>
            </nav>
            <marquee behavior="alternate" direction="right" scrollamount="10">
                text
            </marquee>
        </header>
    );
};

export default Naviagation;