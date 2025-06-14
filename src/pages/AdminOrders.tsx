import { useEffect, useState } from 'react';
import { orderApi, Order } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await orderApi.getAdminOrders();
        setOrders(data);
      } catch (err) {
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading orders...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8F6F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center bg-gradient-to-r from-emerald-50 to-white rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">All Orders</h1>
          <p className="text-lg text-gray-600">View and manage all platform orders</p>
        </div>
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="text-center text-gray-600">No orders found.</div>
          ) : (
            orders.map(order => (
              <Card key={order.id} className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <span>Order #{order.id}</span>
                    <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <span className="font-semibold">User:</span> {order.user.name} ({order.user.email})
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Total:</span> {order.total} EGP
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Status:</span> <span className="capitalize">{order.status}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Items:</span>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      {order.items.map(item => (
                        <li key={item.id}>
                          {item.name} (x{item.quantity}) - {item.price} EGP
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders; 