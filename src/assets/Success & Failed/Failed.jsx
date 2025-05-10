import React from 'react';
import { Link } from 'react-router-dom';

const Failed = () => {
return (
    <div className="flex justify-center items-center min-h-screen bg-red-50">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-4xl font-semibold text-red-700 mb-4">Payment Failed!</h2>
        <p className="text-lg text-gray-500 mb-6">Oops! Something went wrong with your payment. Please try again later.</p>
        <Link
        to="/payment"
        className="text-white bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md"
        >
        Try Again
        </Link>
    </div>
    </div>
);
};

export default Failed;
