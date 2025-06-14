import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Star } from 'lucide-react';
import api, { productApi, Product } from '@/lib/api';

// Extend Product with seller-specific fields
interface SellerProduct extends Product {
  category?: string;
  status?: string;
  condition?: string;
}

const SellerItems = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSellerProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productApi.getProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch your products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchSellerProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(product => product.id !== id));
      alert(`Product "${name}" deleted successfully!`);
    } catch (err) {
      alert('Failed to delete product. Product is in an order.');
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
            {loading ? (
              <div className="text-center py-16 col-span-full">
                <p className="text-xl text-gray-600">Loading your products...</p>
              </div>
            ) : error ? (
              <div className="text-center py-16 col-span-full">
                <p className="text-xl text-red-600">{error}</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 col-span-full">
                <p className="text-gray-500 text-lg">No products found matching your search.</p>
              </div>
            ) : filteredProducts.map((product) => (
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
                      {product.status ?? 'Unknown'}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                        {product.category ?? 'N/A'}
                      </span>
                      <div className="flex space-x-1">
                        {[...Array(getStarsFromCondition(product.condition ?? ''))].map((_, i) => (
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
        </div>
      </section>
    </div>
  );
};

export default SellerItems;