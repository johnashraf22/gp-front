import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/contexts/UserContext';
import api from '@/lib/api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const testCredentials = [
    { 
      email: 'user@test.com', 
      password: 'user123', 
      type: 'User',
      description: 'Full user functionality - browse products, add to cart, place orders, manage favorites, view product details, make payments'
    },
    { 
      email: 'seller@test.com', 
      password: 'seller123', 
      type: 'Seller',
      description: 'Complete seller dashboard - add products, manage listings, edit items, view sales, handle payments, track requests'
    },
    { 
      email: 'admin@test.com', 
      password: 'admin123', 
      type: 'Admin',
      description: 'Full admin control - approve/reject requests, manage categories, moderate reviews, control platform settings'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await api.post('/auth/login', formData);
      const { token, user } = response.data;
      
      // Save token separately for API interceptor
      localStorage.setItem('token', token);
      
      // Create user data with token
      const userData = {
        ...user,
        token,
        role: user.role || 'user' // Default to user if not specified
      };
      
      // Update context with user data
      login(userData);

      // Navigate based on user role
      if (userData.role === 'admin') {
        navigate('/admin');
      } else if (userData.role === 'seller') {
        navigate('/seller');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage: "url('../../public/2411.jpg')"
      }}
    >
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-lg px-4">
        <div className="bg-white/50 backdrop-blur-sm shadow-xl border-0 rounded-xl overflow-hidden">
          <div className="p-10">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-black">Login</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-gray-900 font-medium text-lg">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  className="bg-white/40 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-emerald-600 focus:ring-emerald-600 focus:ring-1 h-12 text-lg"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-gray-900 font-medium text-lg">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter your password"
                    className="bg-white/40 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-emerald-600 focus:ring-emerald-600 focus:ring-1 pr-12 h-12 text-lg"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-600 hover:text-gray-900"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-md hover:shadow-lg py-4 text-lg font-medium"
              >
                Sign In
              </Button>
            </form>

            <div className="text-center mt-8">
              <p className="text-gray-900 text-lg">
                Don't have an account?{' '}
                <Link to="/register" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;