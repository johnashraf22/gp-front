import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const AdminManageItems = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "The Great Gatsby",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80",
      price: 45,
      category: "Books",
      seller: "Ahmed Mohamed"
    },
    {
      id: 2,
      name: "Summer Dress",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&q=80",
      price: 120,
      category: "Clothes",
      seller: "Sara Ali"
    },
    {
      id: 3,
      name: "Pride and Prejudice",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80",
      price: 35,
      category: "Books",
      seller: "Mohamed Hassan"
    },
    {
      id: 4,
      name: "Vintage T-Shirt",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
      price: 80,
      category: "Clothes",
      seller: "Fatima Ahmed"
    }
  ]);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(product => product.id !== id));
      alert(`Product deleted successfully!`);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.seller.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F6F0]">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center bg-gradient-to-r from-emerald-50 to-white rounded-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Manage Items</h1>
            <p className="text-lg text-gray-600">Monitor and control product listings</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search products, categories, or sellers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 bg-white shadow-lg"
              />
            </div>
          </div>

          {/* Content */}
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <p className="text-gray-600">Total Products: {filteredProducts.length}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        {product.category}
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">Seller: {product.seller}</p>
                      <p className="text-xl font-bold text-emerald-600 mb-4">{product.price} EGP</p>
                      
                      <Button
                        onClick={() => handleDelete(product.id)}
                        variant="outline"
                        className="w-full border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminManageItems;