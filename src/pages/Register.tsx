import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, ShoppingBag, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/contexts/UserContext';
import api from '@/lib/api';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [step, setStep] = useState<number>(1);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [formData, setFormData] = useState<{
    name: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    name: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const userTypes = [
    { id: 'user', name: 'User', icon: User, description: 'Browse and purchase second-hand items' },
    { id: 'seller', name: 'Seller', icon: ShoppingBag, description: 'List and sell your items' },
  ];

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Create registration data with role
      const registrationData = {
        ...formData,
        role: selectedRole || 'user' // Default to user if somehow not selected
      };
      
      // Remove confirmPassword as it's not needed in the API
      delete registrationData.confirmPassword;

      const response = await api.post('/auth/register', registrationData);
      const { token, user } = response.data;
      
      // Save token separately for API interceptor
      localStorage.setItem('token', token);
      
      // Create user data with token
      const userData = {
        ...user,
        token,
        role: user.role || selectedRole || 'user'
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
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage: 'url("../../public/book.avif")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-4xl px-4">
        <div className="bg-white/50 backdrop-blur-sm shadow-xl border-0 rounded-xl overflow-hidden p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900">
              {step === 1 ? 'Register As?' : `Complete Your ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Registration`}
            </h2>
          </div>

          <div className="bg-white/50 backdrop-blur-sm shadow-xl border-0 rounded-xl overflow-hidden">
            <div className="p-8">
              {step === 1 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    {userTypes.map((type) => (
                      <div 
                        key={type.id}
                        className="cursor-pointer transition-all duration-300 hover:bg-white/60 bg-white/40 p-6 rounded-lg border border-gray-200 hover:border-gray-300"
                        onClick={() => handleRoleSelect(type.id)}
                      >
                        <div className="text-center">
                          <type.icon className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{type.name}</h4>
                          <p className="text-sm text-gray-700">{type.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <Button 
                      variant="outline" 
                      onClick={() => setStep(1)}
                      className="text-emerald-600 border-gray-300 hover:bg-white/60 hover:text-emerald-700"
                    >
                      Change Role
                    </Button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-900 font-medium">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter your full name"
                          className="bg-white/40 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-emerald-600 focus:ring-emerald-600 focus:ring-1"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-900 font-medium">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="Enter your phone number"
                          className="bg-white/40 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-emerald-600 focus:ring-emerald-600 focus:ring-1"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-gray-900 font-medium">Address</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Enter your complete address"
                        className="bg-white/40 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-emerald-600 focus:ring-emerald-600 focus:ring-1"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-900 font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                        className="bg-white/40 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-emerald-600 focus:ring-emerald-600 focus:ring-1"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-900 font-medium">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                            placeholder="Enter your password"
                            className="bg-white/40 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-emerald-600 focus:ring-emerald-600 focus:ring-1 pr-10"
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
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-gray-900 font-medium">Confirm Password</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            placeholder="Confirm your password"
                            className="bg-white/40 border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-emerald-600 focus:ring-emerald-600 focus:ring-1 pr-10"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-600 hover:text-gray-900"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-md hover:shadow-lg py-3"
                    >
                      Create Account
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-900">
              Already have an account?{' '}
              <Link to="/login" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;