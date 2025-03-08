// components/Sidebar.js
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4 h-screen">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <ul>
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/products">Products</Link></li>
        <li><Link to="/admin/orders">Orders</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/categories">Categories</Link></li>
        <li><Link to="/admin/settings">Settings</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
