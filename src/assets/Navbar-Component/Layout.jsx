import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Naviagtion";

const Layout = () => {
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith("/admin"); // Check if the path starts with "/admin"

    return (
        <>
            {!isAdminPage && <Navigation />}  {/* Hide Navigation for Admin Pages */}
            <Outlet />
            {!isAdminPage && <Footer />}  {/* Hide Footer for Admin Pages */}
        </>
    );
};

export default Layout;
