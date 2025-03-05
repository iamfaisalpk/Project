import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './assets/Navbar-Component/Layout';
import Home from './assets/Navbar-Component/Home';
import Error from './assets/Navbar-Component/Error';
import Login from './assets/Navbar-Component/Login';
import Register from './assets/Navbar-Component/Reg';
import { CartProvider } from './assets/Cart/CartContext'; 
import Men from './assets/Navbar-Component/Men';
import Women from './assets/Navbar-Component/Women';
import ProductList from './assets/Navbar-Component/Products';
import Cart from './assets/Cart/CartPage';
import ProductDetails from './assets/Navbar-Component/ProductDetails';
import Payment from './assets/PaymentSection/Payment';
import OrderConfirmed from './assets/PaymentSection/OrderConfirmed';
import OrderHistory from './assets/Order/OrderHistory';
import UserProfile from './assets/UserProfile/UserProfile';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [
            { path: '/home', element: <Home /> },
            { path: '/login', element: <Login /> },
            { path: '/Reg', element: <Register /> },  
            { path: '/men', element: <Men /> },
            { path: '/women', element: <Women /> },
            { path: '/products', element: <ProductList /> },
            { path: '/products/:id', element: <ProductDetails /> },
            { path: '/cart', element: <Cart /> },
            { path: '/payment', element: <Payment /> }, 
            { path: '/order', element: <OrderConfirmed /> },
            { path: '/profile', element: <UserProfile /> }, 
            { path: '/orders', element: <OrderHistory /> }  
        ],
    },
]);

const App = () => {
    return (
        <CartProvider> 
            <RouterProvider router={router} />
        </CartProvider>
    );
};

export default App;
