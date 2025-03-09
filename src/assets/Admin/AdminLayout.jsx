import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./Sidebar";


const AdminLayout = () => {
    return (
        <div className="flex">
            <AdminSidebar /> 
            <div className="flex-1 p-5 bg-gray-100 min-h-screen">
                <Outlet /> 
            </div>
        </div>
    );
};

export default AdminLayout;
