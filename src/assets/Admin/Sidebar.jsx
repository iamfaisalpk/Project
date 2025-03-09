import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <div className="w-64 bg-gray-800 text-white h-screen p-5">
            <h2 className="text-2xl font-bold mb-5">Admin Panel</h2>
            <nav className="flex flex-col gap-3">
                <Link to="/admin" className="hover:bg-gray-700 p-2 rounded">📊 Dashboard</Link>
                <Link to="/admin/products" className="hover:bg-gray-700 p-2 rounded">👟 Products</Link>
                <Link to="/admin/orders" className="hover:bg-gray-700 p-2 rounded">📦 Orders</Link>
                <Link to="/admin/users" className="hover:bg-gray-700 p-2 rounded">👥 Users</Link>
                <Link to="/admin/categories" className="hover:bg-gray-700 p-2 rounded">🗂 Categories</Link>
                <Link to="/admin/settings" className="hover:bg-gray-700 p-2 rounded">⚙ Settings</Link>
            </nav>
        </div>
    );
};

export default AdminSidebar;
