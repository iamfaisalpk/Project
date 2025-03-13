import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [womens, setWomens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('http://localhost:3000/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const usersData = Array.isArray(data) ? data : [data];
        setUsers(usersData);

        const totalUsers = usersData.length;
        const allOrders = usersData.flatMap((user) => user.orders || []);
        const totalOrders = allOrders.length;
        const totalSales = allOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        const totalRevenue = totalSales * 0.10;

        return Promise.all([
          fetch('http://localhost:3000/products').then((res) => res.json()),
          fetch('http://localhost:3000/womens').then((res) => res.json()),
        ]).then(([productsData, womensData]) => ({
          productsData,
          womensData,
          totalUsers,
          totalOrders,
          totalSales,
          totalRevenue,
        }));
      })
      .then(({ productsData, womensData, totalUsers, totalOrders, totalSales, totalRevenue }) => {
        setProducts(productsData);
        setWomens(womensData);
        const totalProducts = new Set([...productsData, ...womensData].map((item) => item.id)).size;
        setDashboardData({
          totalUsers,
          totalOrders,
          totalProducts,
          totalSales,
          totalRevenue,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please check the server or try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-orange-600">{error}</div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-5xl font-bold ">
        <span className="text-black">Sneakers</span>
        <span className="text-orange-400">World</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
          <p className="text-3xl font-bold text-orange-600">{dashboardData.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Orders</h3>
          <p className="text-3xl font-bold text-orange-600">{dashboardData.totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Products</h3>
          <p className="text-3xl font-bold text-orange-600">{dashboardData.totalProducts}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Sales</h3>
          <p className="text-3xl font-bold text-orange-700">${dashboardData.totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Revenue</h3>
          <p className="text-3xl font-bold text-orange-500">${dashboardData.totalRevenue.toFixed(2)}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-600 mb-4">Recent Registered Users</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-orange-100">
              <th className="text-left p-2 text-orange-800">User</th>
              <th className="text-left p-2 text-orange-800">Email</th>
              <th className="text-left p-2 text-orange-800">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user.email !== 'admin@gmail.com') // Filter out admin@gmail.com
              .map((user) => {
                const userTotalAmount = (user.orders || []).reduce(
                  (sum, order) => sum + (order.totalAmount || 0),
                  0
                );
                return (
                  <tr key={user.id} className="border-t border-orange-200">
                    <td className="p-2 text-gray-700">{user.username}</td>
                    <td className="p-2 text-gray-700">{user.email}</td>
                    <td className="p-2 text-orange-600">${userTotalAmount.toFixed(2)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-600 mb-4">Recent Orders</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-orange-100">
              <th className="text-left p-2 text-orange-800">Order ID</th>
              <th className="text-left p-2 text-orange-800">Date</th>
              <th className="text-left p-2 text-orange-800">Amount</th>
              <th className="text-left p-2 text-orange-800">Status</th>
            </tr>
          </thead>
          <tbody>
            {users
              .flatMap((user) => user.orders || [])
              .map((order) => (
                <tr key={order.orderId || order.date} className="border-t border-orange-200">
                  <td className="p-2 text-gray-700">{order.orderId || 'N/A'}</td>
                  <td className="p-2 text-gray-700">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="p-2 text-orange-600">${order.totalAmount.toFixed(2)}</td>
                  <td className="p-2 text-gray-700">{order.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;