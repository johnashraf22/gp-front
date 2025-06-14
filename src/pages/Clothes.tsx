import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useSoldOut } from '@/contexts/SoldOutContext';
import SoldOutStripe from '@/components/SoldOutStripe';
import { productApi, Product } from '@/lib/api';
import { useUser } from '@/contexts/UserContext';
import api from '@/lib/api';

// Extend Product for clothes-specific fields
interface ClothesProduct extends Product {
  reviews?: number;
  category?: string;
  size?: string;
}

const Clothes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { isProductSoldOut } = useSoldOut();
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();

  const categories = ['All', 'T-Shirts', 'Tops', 'Pants', 'Jackets', 'Dresses'];

  const [clothes, setClothes] = useState<ClothesProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClothes = async () => {
      try {
        setLoading(true);
        setError(null);
        const products = await productApi.getProducts('clothes');
        setClothes(products);
      } catch (err) {
        setError('Failed to fetch clothes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchClothes();
  }, []);

  const filteredClothes = clothes.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (item: ClothesProduct) => {
    alert("Please log in to view product details");
  };

  const handleAddToCart = (e: React.MouseEvent, item: ClothesProduct) => {
    e.stopPropagation();
    alert("Please log in to add items to cart");
  };

  const handleAddToFavorites = (e: React.MouseEvent, item: ClothesProduct) => {
    e.stopPropagation();
    alert("Please log in to add items to favorites");
  };

  const handleBuyNow = async (e: React.MouseEvent, item: ClothesProduct) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      alert('Please log in to purchase items');
      navigate('/login');
      return;
    }
    try {
      await api.post('/cart', { product_id: item.id });
      navigate('/cart');
    } catch (err) {
      alert('Failed to add to cart. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0]">
      {/* Page Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center bg-gradient-to-r from-emerald-50 to-white rounded-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Clothes Collection</h1>
            <p className="text-lg text-gray-600">Find stylish second-hand clothing for every occasion</p>
          
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for clothes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 bg-white shadow-lg"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clothes Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">Loading clothes...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-xl text-red-600">{error}</p>
            </div>
          ) : filteredClothes.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No clothes found matching your search and filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredClothes.map((item) => (
                <Card
                  key={item.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border-0 shadow-md relative"
                  onClick={() => handleProductClick(item)}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      {isProductSoldOut(item.id) && <SoldOutStripe />}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full bg-white/90 hover:bg-white"
                          onClick={(e) => handleAddToFavorites(e, item)}
                          disabled={isProductSoldOut(item.id)}
                        >
                          <Heart className="h-4 w-4 text-emerald-600" />
                        </Button>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="rounded-full bg-white/90 hover:bg-white"
                          onClick={(e) => handleAddToCart(e, item)}
                          disabled={isProductSoldOut(item.id)}
                        >
                          <ShoppingCart className="h-4 w-4 text-emerald-600" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{item.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(item.rating)
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">({item.reviews ?? 0})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-emerald-600">{item.price} EGP</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                          onClick={(e) => handleBuyNow(e, item)}
                          disabled={isProductSoldOut(item.id)}
                        >
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">The Hidden Haul</h3>
              <p className="text-gray-300 leading-relaxed">
                Your trusted marketplace for second-hand books and clothing. 
                Promoting sustainability while helping you discover unique treasures.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-gray-300 hover:text-emerald-400 transition-colors">About Us</Link>
                <Link to="/books" className="block text-gray-300 hover:text-emerald-400 transition-colors">Books</Link>
                <Link to="/clothes" className="block text-emerald-400">Clothes</Link>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <a 
                href="mailto:TheHiddenHaul@gmail.com"
                className="text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                TheHiddenHaul@gmail.com
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 The Hidden Haul. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Clothes;
