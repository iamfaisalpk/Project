import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
return (
    <div className="flex justify-center items-center min-h-screen bg-green-50">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-4xl font-semibold text-green-700 mb-4">Payment Successful!</h2>
        <p className="text-lg text-gray-500 mb-6">Your payment has been successfully processed. Thank you for your purchase!</p>
        <Link
        to="/home"
            className="text-white bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md"
        >
        Back to Home
        </Link>
    </div>
    </div>
);
};

export default Success;
