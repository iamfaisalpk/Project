import React, { useState, useEffect } from 'react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const users = await response.json();
        
        const allOrders = users
          .filter(user => user.orders && user.orders.length > 0)
          .flatMap(user => user.orders.map(order => ({
            ...order,
            customerName: user.username,
            customerEmail: user.email,
            orderId: order.orderId || `ORD-${order.userId}-${order.date}`
          })));
        
        setOrders(allOrders);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  
  const updateOrderStatus = async (orderId, userId, newStatus) => {
    try {
      const userResponse = await fetch(`http://localhost:3000/users/${userId}`);
      const user = await userResponse.json();
      
      const updatedOrders = user.orders.map(order => 
        (order.orderId || `ORD-${order.userId}-${order.date}`) === orderId 
          ? { ...order, status: newStatus } 
          : order
      );

      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orders: updatedOrders }),
      });
      
      if (response.ok) {
        setOrders(orders.map(order => 
          order.orderId === orderId ? { ...order, status: newStatus } : order
        ));
      }
    } catch (err) {
      setError('Failed to update order status');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded" role="alert">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-orange-50">
      <h1 className="text-4xl font-extrabold text-orange-800 mb-6">Order Management</h1>
      
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-orange-200">
        <div className="p-6">
          <div className="mb-6">
            <p className="text-orange-600 text-lg font-medium">Total Orders: {orders.length}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-orange-100">
                <tr>
                  <th className="px-6 py-3 text-sm font-semibold text-orange-700">Order ID</th>
                  <th className="px-6 py-3 text-sm font-semibold text-orange-700">Customer</th>
                  <th className="px-6 py-3 text-sm font-semibold text-orange-700">Email</th>
                  <th className="px-6 py-3 text-sm font-semibold text-orange-700">Date</th>
                  <th className="px-6 py-3 text-sm font-semibold text-orange-700">Total</th>
                  <th className="px-6 py-3 text-sm font-semibold text-orange-700">Status</th>
                  <th className="px-6 py-3 text-sm font-semibold text-orange-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-200">
                {orders.map((order) => (
                  <tr key={order.orderId} className="hover:bg-orange-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.orderId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customerEmail}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.totalAmount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Processing' ? 'bg-orange-100 text-orange-800' :
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800' 
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.orderId, order.userId, e.target.value)}
                        className="border border-orange-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-700"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;