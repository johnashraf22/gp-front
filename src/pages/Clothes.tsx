import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useSoldOut } from '@/contexts/SoldOutContext';
import SoldOutStripe from '@/components/SoldOutStripe';

const Clothes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { isProductSoldOut } = useSoldOut();

  const categories = ['All', 'T-Shirts', 'Tops', 'Pants', 'Jackets', 'Dresses'];

  const clothes = [
    {
      id: 1,
      name: "Vintage Denim Jacket",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?auto=format&fit=crop&w=400&q=80",
      price: 120,
      rating: 4.8,
      reviews: 76,
      category: "Jackets",
      size: "M"
    },
    {
      id: 2,
      name: "Floral Summer Top",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80",
      price: 85,
      rating: 4.6,
      reviews: 54,
      category: "Tops",
      size: "S"
    },
    {
      id: 3,
      name: "Cozy Knit Sweater",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80",
      price: 95,
      rating: 4.4,
      reviews: 32,
      category: "Tops",
      size: "L"
    },
    {
      id: 4,
      name: "High Waist Jeans",
      image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=400&q=80",
      price: 110,
      rating: 4.7,
      reviews: 89,
      category: "Pants",
      size: "M"
    },
    {
      id: 5,
      name: "Graphic T-Shirt",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
      price: 45,
      rating: 4.3,
      reviews: 67,
      category: "T-Shirts",
      size: "S"
    },
    {
      id: 6,
      name: "Elegant Evening Dress",
      image: "https://images.unsplash.com/photo-1566479179817-06e1c5d71a9a?auto=format&fit=crop&w=400&q=80",
      price: 180,
      rating: 4.9,
      reviews: 123,
      category: "Dresses",
      size: "M"
    },
    {
      id: 7,
      name: "Leather Boots",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?auto=format&fit=crop&w=400&q=80",
      price: 150,
      rating: 4.5,
      reviews: 45,
      category: "Accessories",
      size: "38"
    },
    {
      id: 8,
      name: "Casual Blazer",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=80",
      price: 135,
      rating: 4.6,
      reviews: 78,
      category: "Jackets",
      size: "L"
    }
  ];

  const filteredClothes = clothes.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (item: any) => {
    alert("Please log in to view product details");
  };

  const handleAddToCart = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    alert("Please log in to add items to cart");
  };

  const handleAddToFavorites = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    alert("Please log in to add items to favorites");
  };

  const handleBuyNow = (e: React.MouseEvent, item: any) => {
    e.stopPropagation();
    alert("Please log in to purchase items");
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
          {filteredClothes.length === 0 ? (
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
                        <span className="text-sm text-gray-600 ml-2">({item.reviews})</span>
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
