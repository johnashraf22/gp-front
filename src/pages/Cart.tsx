import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, Truck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import api from '@/lib/api';

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  type: string;
  maxQuantity: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const deliveryCharge = 25;

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
      items = items.map((item: any) => {
        console.log(item);
        return {
          id: item.product.id,
          name: item.product.name,
          image: item.product.image,
          price: item.product.price,
          quantity: item.quantity,
          type: item.product.type,
          maxQuantity: item.product.max_quantity
        };
      });
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id: number, change: number) => {
    try {
      const item = cartItems.find(item => item.id === id);
      if (!item) return;

      const newQuantity = Math.max(1, Math.min(item.maxQuantity,  change));
      
      await api.put(`/cart/${id}`, {
        quantity: newQuantity
      });

      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity. Please try again.');
    }
  };

  const removeItem = async (id: number) => {
    try {
      await api.delete(`/cart/${id}`);
      setCartItems(items => items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item. Please try again.');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price), 0);
  const totalPrice = subtotal + deliveryCharge;


  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F6F0] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mx-auto" />
          <p className="mt-2 text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F0]">

      {/* Cart Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
           <div className="mb-8 text-center bg-gradient-to-r from-emerald-50 to-white rounded-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Shopping Cart</h1>
            <p className="text-lg text-gray-600">Review and manage your selected items</p>
          </div>


          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Add some items to get started</p>
              <Link to="/books">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-md hover:shadow-lg">
                  Browse Products
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="bg-white shadow-lg border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-6">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h3>
                          <p className="text-emerald-600 font-medium capitalize">{item.type}</p>
                        </div>


                        <div className="text-right">
                          <p className="text-2xl font-bold text-emerald-600">{item.price} EGP</p>
                          <p className="text-sm text-gray-500">{item.price} EGP each</p>
            
                        </div>

                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => removeItem(item.id)}
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Delivery Information */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-emerald-600">
                    <Truck className="h-5 w-5" />
                    <span>Delivery Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Delivery Charge</span>
                      <span className="font-semibold text-gray-800">{deliveryCharge} EGP</span>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <p className="text-sm text-emerald-700">
                        <strong>Delivery Time:</strong> 2-3 business days
                      </p>
                      <p className="text-sm text-emerald-700 mt-1">
                        <strong>Delivery Method:</strong> Standard delivery to your address
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cart Summary */}
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Subtotal ({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</span>
                      <span className="font-semibold text-gray-800">{subtotal} EGP</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Delivery Charge</span>
                      <span className="font-semibold text-gray-800">{deliveryCharge} EGP</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-semibold text-gray-800">Total</span>
                        <span className="text-3xl font-bold text-emerald-600">{totalPrice} EGP</span>
                      </div>
                    </div>
                  </div>
                 <div className="mt-6 space-y-3">
                    <Link to="/payment">
                      <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 text-lg">
                        Proceed to Checkout
                      </Button>
                    </Link>

                  <Link to="/">
                      <Button variant="outline" className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                        Continue Shopping
                      </Button>
                    </Link>
                    </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;
