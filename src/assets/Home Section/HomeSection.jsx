import React from 'react';
import banner from '../Home Section/shoe.png';
import { Link } from 'react-router-dom';

const HomeSection = () => {
return (
    <>
    <div className="relative  mt-5 md:mx-8 lg:mx-15">
        {/* Image Section */}
        <div className="flex justify-end">
        <img
            src={banner}
            alt="Photo"
            className="max-w-full h-auto object-cover object-center md:w-[1250px] md:h-[720px]"
        />
        </div>

        {/* Text Overlay */}
        <div className="absolute top-5 left-5 sm:top-[50px] sm:left-[50px] md:left-[100px]">
        <h1 className="text-4xl font-bold text-black leading-tight sm:text-5xl md:text-[80px] md:leading-[80px]">
            YOUR FEET<br />DESERVE<br />THE BEST
        </h1>
        <p className="text-black pt-3 font-medium text-sm sm:text-base md:pt-5">
            Sneakers are a blend of style and comfort, <br />
            making every step confident. <br />
            Lace up, step out, and make a statement!
        </p>
        </div>

        {/* Buttons */}
        <div className="absolute top-[65%] left-5 flex flex-col gap-3 sm:flex-row sm:top-[60%] sm:left-[12%] sm:gap-5">
        <button className="bg-[#ffffff] rounded-[8px] px-4 py-2 text-sm sm:text-base hover:bg-amber-500 hover:text-white">
            <Link to="/men">Men</Link>
        </button>
        <button className="bg-[#ffffff] rounded-[8px] px-4 py-2 text-sm sm:text-base hover:bg-amber-500 hover:text-white">
            <Link to="/women">Women</Link>
        </button>
        </div>
    </div>
    </>
);
};

export default HomeSection;