import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Star } from 'lucide-react';

const SellerItems = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [products] = useState([
    {
      id: 1,
      name: "The Great Gatsby",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80",
      price: 45,
      status: "Approved",
      category: "Books",
      condition: "Very Good"
    },
    {
      id: 2,
      name: "Vintage Denim Jacket",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?auto=format&fit=crop&w=400&q=80",
      price: 120,
      status: "Pending",
      category: "Clothes",
      condition: "Excellent"
    },
    {
      id: 3,
      name: "Summer Dress",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80",
      price: 95,
      status: "Sold",
      category: "Clothes",
      condition: "Like New"
    },
    {
      id: 4,
      name: "Pride and Prejudice",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80",
      price: 40,
      status: "Approved",
      category: "Books",
      condition: "Good"
    }
  ]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      alert(`Product "${name}" deleted successfully!`);
    }
  };

  // تحويل condition إلى عدد نجوم
  const getStarsFromCondition = (condition: string) => {
    switch (condition) {
      case "Excellent":
        return 5;
      case "Very Good":
        return 4;
      case "Like New":
        return 3;
      case "Good":
        return 2;
      default:
        return 1;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0]">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center bg-gradient-to-r from-emerald-50 to-white rounded-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">My Products</h1>
            <p className="text-lg text-gray-600">Manage and track your listed items</p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold ${
                      product.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      product.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {product.status}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                        {product.category}
                      </span>
                      <div className="flex space-x-1">
                        {[...Array(getStarsFromCondition(product.condition))].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-emerald-600">{product.price} EGP</span>
                    </div>
                    <div className="flex space-x-2">
                      <Link to={`/seller/edit/${product.id}`} className="flex-1">
                        <Button 
                          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                          size="sm"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleDelete(product.id, product.name)}
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SellerItems;