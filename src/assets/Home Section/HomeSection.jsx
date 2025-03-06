import React from 'react';
import banner from '../Home Section/shoeaa.png';
import { Link } from 'react-router-dom';

const HomeSection = () => {
return (
    <>
    <div className="relative">
        <div className="pl-[20px] pb-[20px] pr-[20px] pt-[20px]">
            <img src={banner} alt="Photo" className="w-[1250px] h-[560px] object-cover object-center " />
        </div>

        <div className="absolute top-[50px] left-[40px] sm:absolute ">
            <h1 className="text-[80px] font-bold text-orange-400 leading-[80px]">
                YOUR FEET<br/>DESERVE<br/>THE BEST
            </h1>
            <p className="text-white pt-5 font-medium">
            Sneakers are a blend of style and comfort, <br />
            making every step confident. <br />
            Lace up, step out, and make a statement!
            </p>
        </div>

        <div className="absolute top-[75%] left-[5%] flex gap-5 ">
        <button className="bg-[#ffffff] rounded-[8px] px-2 hover:bg-amber-500 hover:text-white"><Link to = '/men'>Men</Link></button>
        <button className="bg-[#ffffff] rounded-[8px] px-2 hover:bg-amber-500 hover:text-white"><Link to = '/women'>Women</Link></button>
        </div>
        
    </div>
    </>
)
}

export default HomeSection
