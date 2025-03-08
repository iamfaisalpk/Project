// components/AdminLayout.js
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-4">
          <Outlet /> {/* This will load the current admin page */}
        </div>
    </div>
    </div>
  );
};

export default AdminLayout;
