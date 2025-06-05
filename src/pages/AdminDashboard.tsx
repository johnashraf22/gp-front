import { Link } from 'react-router-dom';
import { Users, DollarSign, Package, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Users', value: '1,234', icon: Users, color: 'text-blue-600' },
    { title: 'Monthly Revenue', value: '25,000 EGP', icon: DollarSign, color: 'text-green-600' },
    { title: 'Total Products', value: '856', icon: Package, color: 'text-purple-600' },
    { title: 'Pending Requests', value: '23', icon: Clock, color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F0]">
    
      {/* Dashboard Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center bg-gradient-to-r from-emerald-50 to-white rounded-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
            <p className="text-lg text-gray-600">Manage and monitor your platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-emerald-600">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">New seller registration: Ahmed Mohamed</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Product approved: "The Great Gatsby"</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700">Payment pending: Summer Dress listing</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-emerald-600">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/admin/requests" className="block">
                  <div className="p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer">
                    <h3 className="font-semibold text-emerald-700">Review Requests</h3>
                    <p className="text-sm text-emerald-600">23 Requests</p>
                  </div>
                </Link>
                <Link to="/admin/rates" className="block">
                  <div className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                    <h3 className="font-semibold text-blue-700">Moderate Reviews</h3>
                    <p className="text-sm text-blue-600">12 reviews to approve</p>
                  </div>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;