import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Upload, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useUser } from '@/contexts/UserContext';
import api from '@/lib/api';

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  type: string;
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
  };
}

const Payment = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    instaPayNumber: '',
    paymentProof: null as File | null
  });

  const deliveryCharge = 25;
  const orderTotal = cartItems.reduce((sum, item) => sum + item.price, 0) + deliveryCharge;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    fetchCartItems();
  }, [isLoggedIn, navigate]);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await api.get('/cart');
      let items = response.data.data || [];
      items = items.map((item: any) => ({
        id: item.product.id,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
        type: item.product.type,
        product: item.product
      }));
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart:', error);
      alert('Failed to load cart items. Please try again.');
      navigate('/cart');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const paymentData = {
        payment_method: paymentMethod,
        contact: formData.email || formData.phone,
        delivery_charge: deliveryCharge,
        total_amount: orderTotal,
        products: cartItems.map(item => ({
          id: item.id,
          price: item.price,
          
        }))
      };

      if (paymentMethod === 'instapay') {
        if (!formData.paymentProof) {
          alert("Please upload payment proof");
          return;
        }

        // Create FormData for file upload
        const formDataToSend = new FormData();
        formDataToSend.append('payment_proof', formData.paymentProof);
        formDataToSend.append('instapay_number', formData.instaPayNumber);
        Object.entries(paymentData).forEach(([key, value]) => {
          formDataToSend.append(key, value.toString());
        });

        await api.post('/orders', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Cash on delivery
        await api.post('/orders', paymentData);
      }

      setShowConfirmation(true);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, paymentProof: file }));
  };

  const handleOkClick = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F6F0] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mx-auto" />
          <p className="mt-2 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-[#F8F6F0] flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-white shadow-xl border-0 text-center">
          <CardContent className="p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Wait for the order confirmation email. We'll contact you within 24 hours.
            </p>
            <Button 
              onClick={handleOkClick}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-md hover:shadow-lg py-3"
            >
              OK
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F0]">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center bg-gradient-to-r from-emerald-50 to-white rounded-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Payment</h1>
            <p className="text-lg text-gray-600">Choose your preferred payment method</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Order Summary */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-emerald-600">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 mb-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-emerald-600">{item.price} EGP</p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Products Total</span>
                    <span>{cartItems.reduce((sum, item) => sum + item.price, 0)} EGP</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Delivery</span>
                    <span>{deliveryCharge} EGP</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-emerald-600">{orderTotal} EGP</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Selection */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-gray-800">Select Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center space-x-3 cursor-pointer flex-1">
                      <Truck className="h-6 w-6 text-emerald-600" />
                      <div>
                        <p className="font-semibold text-gray-800">Cash on Delivery</p>
                        <p className="text-sm text-gray-600">Pay when you receive your order</p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 p-4 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
                    <RadioGroupItem value="instapay" id="instapay" />
                    <Label htmlFor="instapay" className="flex items-center space-x-3 cursor-pointer flex-1">
                      <CreditCard className="h-6 w-6 text-emerald-600" />
                      <div>
                        <p className="font-semibold text-gray-800">InstaPay</p>
                        <p className="text-sm text-gray-600">Pay instantly using InstaPay</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Cash on Delivery Form */}
            {paymentMethod === 'cash' && (
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-emerald-600">
                    <Truck className="h-5 w-5" />
                    <span>Cash on Delivery Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                      className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <p className="text-emerald-700 text-sm">
                      <strong>Note:</strong> We'll contact you within 24 hours to confirm your order and delivery details.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* InstaPay Form */}
            {paymentMethod === 'instapay' && (
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-emerald-600">
                    <CreditCard className="h-5 w-5" />
                    <span>InstaPay Payment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <p className="text-emerald-700 text-sm mb-2">
                      <strong>Send payment to:</strong> 01234567890
                    </p>
                    <p className="text-emerald-700 text-sm">
                      <strong>Amount:</strong> {orderTotal} EGP
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="contact" className="text-gray-700 font-medium">Email or Phone</Label>
                    <Input
                      id="contact"
                      type="text"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email or phone"
                      className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="instaPayNumber" className="text-gray-700 font-medium">Your InstaPay Number</Label>
                    <Input
                      id="instaPayNumber"
                      type="text"
                      value={formData.instaPayNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, instaPayNumber: e.target.value }))}
                      placeholder="Enter the number you sent payment from"
                      className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="paymentProof" className="text-gray-700 font-medium">Upload Payment Proof</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <label className="flex items-center space-x-2 cursor-pointer bg-emerald-50 hover:bg-emerald-100 transition-colors px-4 py-2 rounded-lg border border-emerald-200">
                        <Upload className="h-4 w-4 text-emerald-600" />
                        <span className="text-emerald-600 font-medium">Choose File</span>
                        <input
                          id="paymentProof"
                          type="file"
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                          required
                        />
                      </label>
                      {formData.paymentProof && (
                        <span className="text-sm text-gray-600">{formData.paymentProof.name}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submit Button */}
            {paymentMethod && (
              <Button 
                type="submit" 
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-md hover:shadow-lg py-3 text-lg"
              >
                {paymentMethod === 'cash' ? 'Confirm Order' : 'Submit Payment'}
              </Button>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default Payment;