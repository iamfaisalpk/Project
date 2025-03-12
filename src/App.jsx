import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { CartProvider } from './assets/Cart/CartContext';
import { AuthProvider } from './AuthContext'; // Updated import path
import Layout from './assets/Navbar-Component/Layout';
import Home from './assets/Navbar-Component/Home';
import Error from './assets/Navbar-Component/Error';
import Login from './assets/Navbar-Component/Login';
import Register from './assets/Navbar-Component/Reg';
import Men from './assets/Navbar-Component/Men';
import Women from './assets/Navbar-Component/Women';
import ProductList from './assets/Navbar-Component/Products';
import Cart from './assets/Cart/CartPage';
import ProductDetails from './assets/Navbar-Component/ProductDetails';
import Payment from './assets/PaymentSection/Payment';
import OrderConfirmed from './assets/PaymentSection/OrderConfirmed';
import OrderHistory from './assets/Order/OrderHistory';
import UserProfile from './assets/UserProfile/UserProfile';
import ProtectedRoute from './assets/admin/ProtectedRoute';
import Dashboard from './assets/admin/AdminDashboard';
import AdminProducts from './assets/admin/AdminProductList';
import AdminOrders from './assets/admin/AdminOrderList';
import Users from './assets/admin/Users';
import AdminSidebar from './assets/Admin/Sidebar';
import AdminLogin from './assets/admin/AdminLogin';

const AdminLayout = () => (
  <div className="flex min-h-screen">
    <AdminSidebar />
    <div className="flex-1 p-6">
      <Outlet />
    </div>
  </div>
);

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout setSearchQuery={setSearchQuery} />,
      errorElement: <Error />,
      children: [
        { path: 'home', element: <Home searchQuery={searchQuery} /> }, // Changed '/' to 'home'
        { path: 'login', element: <Login /> },
        { path: 'reg', element: <Register /> },
        { path: 'men', element: <Men /> },
        { path: 'women', element: <Women /> },
        { path: 'products', element: <ProductList searchQuery={searchQuery} /> },
        { path: 'products/:id', element: <ProductDetails /> },
        { path: 'cart', element: <Cart /> },
        { path: 'payment', element: <Payment /> },
        { path: 'order', element: <OrderConfirmed /> },
        { path: 'profile', element: <UserProfile /> },
        { path: 'orders', element: <OrderHistory /> },
      ],
    },
    {
      path: '/admin',
      children: [
        { path: 'login', element: <AdminLogin /> },
        {
          element: (
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          ),
          children: [
            { path: '', element: <Dashboard /> },
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'products', element: <AdminProducts /> },
            { path: 'orders', element: <AdminOrders /> },
            { path: 'users', element: <Users /> },
          ],
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;