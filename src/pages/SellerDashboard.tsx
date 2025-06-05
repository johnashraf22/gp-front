import { Link } from 'react-router-dom';
import { Package, Plus, DollarSign, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SellerDashboard = () => {
  const stats = [
    { title: 'Total Products', value: '12', icon: Package, color: 'text-blue-600' },
    { title: 'Products Sold', value: '8', icon: DollarSign, color: 'text-green-600' },
    { title: 'Pending Requests', value: '3', icon: Eye, color: 'text-orange-600' },
    { title: 'Total Earnings', value: '2,350 EGP', icon: DollarSign, color: 'text-emerald-600' },
  ];

  const recentProducts = [
    { id: 1, name: 'The Great Gatsby', status: 'Approved', price: '45 EGP' },
    { id: 2, name: 'Vintage Denim Jacket', status: 'Pending', price: '120 EGP' },
    { id: 3, name: 'Summer Dress', status: 'Sold', price: '95 EGP' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F0]">
      {/* Dashboard Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center bg-gradient-to-r from-emerald-50 to-white rounded-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Seller Dashboard</h1>
            <p className="text-lg text-gray-600">Manage your products and sales</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-800">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-emerald-600">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/seller/add-product" className="block">
                  <div className="p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Plus className="h-6 w-6 text-emerald-600" />
                      <div>
                        <h3 className="font-semibold text-emerald-700">Add New Product</h3>
                        <p className="text-sm text-emerald-600">List a new item for sale</p>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="/seller/items" className="block">
                  <div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Package className="h-6 w-6 text-blue-600" />
                      <div>
                        <h3 className="font-semibold text-blue-700">Manage Products</h3>
                        <p className="text-sm text-blue-600">View and edit your listings</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-emerald-600">Recent Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-800">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.price}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        product.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        product.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellerDashboard;