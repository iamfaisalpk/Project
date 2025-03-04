import React from 'react';
import { FaShippingFast } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";

const Services = () => {
return (
    <>
    <div className="container mx-auto px-5 flex py-15 gap-10 items-center justify-center flex-wrap">


        <div className="bg-orange-400 py-3 px-5 rounded text-white flex gap-2 flex-col items-center w-[220px] hover:scale-110 transition
        duration-500">
        <FaShippingFast />
            <p>FREE SHIPPING</p>
        </div>
        <div className="bg-orange-400 py-3 px-5 rounded text-white flex gap-2 flex-col items-center w-[220px] hover:scale-110 transition
        duration-500">
        <MdProductionQuantityLimits />
            <p>QUALITY SHOES</p>
        </div>
        <div className="bg-orange-400 py-3 px-5 rounded text-white flex gap-2 flex-col items-center w-[220px] hover:scale-110 transition
        duration-500">
        <TbTruckReturn />
            <p>EASY RETURN</p>
        </div>
        <div className="bg-orange-400 py-3 px-5 rounded text-white flex gap-2 flex-col items-center w-[220px] hover:scale-110 transition
        duration-500">
        <MdOutlinePayment />
            <p>SECURE PAYMENT</p>
        </div>
    </div>
    </>
)
}

export default Services
