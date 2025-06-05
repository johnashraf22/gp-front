import { Link } from 'react-router-dom';
import { Package, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Order = () => {
  // Sample order data
  const orderItem = {
    id: 1,
    name: "The Great Gatsby",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80",
    price: 45,
    quantity: 1,
    type: "book"
  };

  const deliveryCharge = 25;
  const totalPrice = orderItem.price + deliveryCharge;

  const handleBuy = () => {
    alert("Please log in to proceed to payment");
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0]">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center bg-gradient-to-r from-emerald-50 to-white rounded-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Order Summary</h1>
            <p className="text-lg text-gray-600">Review your order details</p>
          </div>
          <div className="space-y-6">
            {/* Product Details */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-emerald-600">
                  <Package className="h-5 w-5" />
                  <span>Product Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-6">
                  <img 
                    src={orderItem.image} 
                    alt={orderItem.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{orderItem.name}</h3>
                    <p className="text-emerald-600 font-medium capitalize mb-2">{orderItem.type}</p>
                    <p className="text-gray-600">Quantity: {orderItem.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">{orderItem.price} EGP</p>
                  </div>
                </div>
              </CardContent>
            </Card>

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

            {/* Order Total */}
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Product Price</span>
                    <span className="font-semibold text-gray-800">{orderItem.price} EGP</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Delivery Charge</span>
                    <span className="font-semibold text-gray-800">{deliveryCharge} EGP</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-semibold text-gray-800">Total</span>
                      <span className="text-3xl font-bold text-emerald-600">{totalPrice} EGP</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={handleBuy}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-md hover:shadow-lg py-3 text-lg"
              >
                Proceed to Payment
              </Button>
              
              <Link to="/books" className="block">
                <Button 
                  variant="outline"
                  className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;