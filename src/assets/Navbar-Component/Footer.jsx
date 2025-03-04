import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";


const Footer = () => {
return (
    <>
<footer className="bg-black text-orange-400 ">
    <div className="container px-5 py-24 max-auto flex  md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="font-bold ">
            <h3>
            <span className="text-white">Sneakers</span> 
            <span className="text-orange-400">World</span> <span className="text-white">:-</span>
            </h3>
        </div>
        

        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 w-full px-4">
                <h2 className="font-medium tracking-widest text-lg text-white">
                    menu
                </h2>
                <ul className="list-none ">
                    <li >Features</li>
                    <li className="mt-1">Info Center</li>
                    <li className="mt-1">News Blog</li>
                    <li className="mt-1">Login</li>
                </ul>
            </div>

            <div className="lg:w-1/4 w-full px-4">
                <h2 className="font-medium tracking-widest text-lg text-white">
                    Company
                </h2>
                <ul className="list-none ">
                    <li className="mt-1">About Us</li>
                    <li className="mt-1">Privacy Policy</li>
                    <li className="mt-1">Terms & Condition</li>
                </ul>
            </div>

            <div className="lg:w-1/4 w-full px-4 ">
                <h2 className="font-medium tracking-widest text-lg text-white">
                    Contact
                </h2>
                <ul className="list-none">
                    <li >Features</li>
                    <li className="mt-1">Contact support</li>
                    <li className="mt-1">+91 7989348790</li>
                    <li className="mt-1">Activate</li>
                </ul>
            </div>

            <div className="lg:w-1/4 w-full px-4">
                <h2 className="font-medium tracking-widest text-lg text-white">
                    Sneakers
                </h2>
                <ul className="list-none ">
                    <li className="mt-1">Sneakers Support</li>
                    <li className="mt-1">Info center</li>
                    <li className="mt-1">Activate</li>
                </ul>
            </div>

        </div>
    </div>

    <div className="bg-orange-400 text-white">
                <div className="container mx-auto py-4 px-5 flex-wrap flex-col sm:flex-row">
                    <p className="text-sm text-center sm:text-left">
                        0 2025 SneakersWorld --<span>@copyrights</span>
                    </p>
                    <>
                    <p className="flex  sm:ml-auto sm:mt-o mt-2 justify-center sm:justify-center gap-3">
                        <span><FaFacebook  size={20}/></span>
                        <span><FaInstagram size={20}/></span>
                        <span><FaSquareXTwitter size={20}/></span>
                    </p>
                    </>
                </div>
    </div>

</footer>
    </>
);
};

export default Footer;
