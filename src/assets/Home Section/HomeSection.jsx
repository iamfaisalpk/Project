import React from 'react';
import banner from '../Home Section/sneakers.png';
import { Link } from 'react-router-dom';

const HomeSection = () => {
return (
    <>
    <div className="relative bg-gray-300 mx-[15px] mt-[20px]">
        <div className="flex justify-end">
            <img src={banner} alt="Photo" className="w-[750px] mr-4 object-cover object-center " />
        </div>

        <div className="absolute top-[50px] left-[100px] sm:absolute ">
            <h1 className="text-[80px] font-bold text-black leading-[80px]">
                YOUR FEET<br/>DESERVE<br/>THE BEST
            </h1>
            <p className="text-red-600 pt-5 font-medium">
            Sneakers are a blend of style and comfort, <br />
            making every step confident. <br />
            Lace up, step out, and make a statement!
            </p>
        </div>


        <div className="absolute top-[70%] left-[12%] flex gap-5 ">
        <button className="bg-[#ffffff] rounded-[8px] px-2 hover:bg-amber-500 hover:text-white"><Link to = '/men'>Men</Link></button>
        <button className="bg-[#ffffff] rounded-[8px] px-2 hover:bg-amber-500 hover:text-white"><Link to = '/women'>Women</Link></button>
        </div>
        
    </div>
    </>
)
}

export default HomeSection
