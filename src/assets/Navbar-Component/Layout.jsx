import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Naviagtion";

const Layout = () => {
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith("/admin");

    return (
        <>
            {!isAdminPage && <Navigation />} 
            <Outlet />
            {!isAdminPage && <Footer />} 
        </>
    );
};

export default Layout;
