import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { CartProvider } from './assets/Cart/CartContext';
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
import Editproducts from './assets/admin/Editproducts';
import Addproducts from './assets/admin/Addproducts';
import { AuthProvider } from './assets/Admin/AuthContext';
import Success from './assets/Success & Failed/Success';
import Failed from './assets/Success & Failed/Failed';



const AdminLayout = () => {
  console.log('AdminLayout rendered');
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-y-auto lg:ml-72">
        <Outlet />
      </main>
    </div>
  );
};

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout setSearchQuery={setSearchQuery} />,
      errorElement: <Error />,
      children: [
        { path: 'home', element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'reg', element: <Register /> }, 
        { path: 'men', element: <Men /> },
        { path: 'women', element: <Women /> },
        { path: 'products', element: <ProductList searchQuery={searchQuery} /> },
        { path: 'products/:id', element: <ProductDetails /> },
        { path: 'cart', element: <Cart /> },
        { path: 'payment', element: <Payment /> },
        { path: 'order-confirmed', element: <OrderConfirmed /> },
        { path: 'profile', element: <UserProfile /> },
        { path: 'orders', element: <OrderHistory /> },
      ],
    },
    
      { path: 'success/:orderId', element: <Success /> },
        { path: 'failed/:orderId', element: <Failed /> },
    
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
            { index: true, element: <Dashboard /> },
            { path: '/admin/dashboard', element: <Dashboard /> },
            { path: '/admin/products', element: <AdminProducts /> },
            { path: '/admin/orders', element: <AdminOrders /> },
            { path: '/admin/users', element: <Users /> },
            { path: 'products/edit/:id', element: <Editproducts /> },
            { path: 'products/add', element: <Addproducts /> },
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