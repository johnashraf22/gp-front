import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { productApi, Product } from '@/lib/api';

const Index = () => {
  const navigate = useNavigate();

  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await productApi.getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Sample reviews for opinion section
  const reviews = [
    {
      id: 1,
      text: "Found amazing vintage books here! Quality is outstanding.",
      author: "Sarah M.",
      rating: 5,
      rotation: "rotate-2"
    },
    {
      id: 2,
      text: "Love the sustainable approach. Great clothes at fair prices.",
      author: "Emma L.",
      rating: 5,
      rotation: "-rotate-1"
    },
    {
      id: 3,
      text: "The Hidden Haul is my go-to for second-hand treasures!",
      author: "Maya K.",
      rating: 4,
      rotation: "rotate-1"
    },
    {
      id: 4,
      text: "Excellent customer service and fast delivery.",
      author: "Nour A.",
      rating: 5,
      rotation: "-rotate-2"
    },
    {
      id: 5,
      text: "Such unique finds! Definitely recommend to everyone.",
      author: "Layla H.",
      rating: 5,
      rotation: "rotate-3"
    }
  ];

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const nextProducts = () => {
    setCurrentProductIndex((prev) => 
      prev + 4 >= products.length ? 0 : prev + 1
    );
  };

  const prevProducts = () => {
    setCurrentProductIndex((prev) => 
      prev === 0 ? products.length - 4 : prev - 1
    );
  };

  const visibleProducts = products.slice(currentProductIndex, currentProductIndex + 4);

  return (
    <div className="min-h-screen bg-[#F8F6F0]">

      {/* Welcome Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("../../public/1223.jpg")',
            filter: 'brightness(0.3)'
          }}
        />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover Hidden <span className="text-emerald-400">Treasures</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed max-w-2xl mx-auto">
            "A room without books is like a body without a soul, and fashion is a language that creates itself in clothes to interpret reality."
          </p>
          <div className="w-24 h-1 bg-emerald-400 mx-auto"></div>
        </div>
      </section>

      {/* Product Recommendations Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Recommended for You</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover carefully curated second-hand books and clothing that match your style and interests
          </p>
        </div>

        <div className="relative">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </div>
          ) : error ? (
            <div className="text-center text-red-600 min-h-[300px] flex items-center justify-center">
              <p>{error}</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevProducts}
                  className="rounded-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 transition-colors shadow-md"
                  disabled={products.length <= 4}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextProducts}
                  className="rounded-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 transition-colors shadow-md"
                  disabled={products.length <= 4}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleProducts.map((product) => (
                  <Card 
                    key={product.id} 
                    className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white border-0 shadow-md"
                    onClick={() => handleProductClick(product)}
                  >
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button size="icon" variant="secondary" className="rounded-full bg-white/90 hover:bg-white">
                            <Heart className="h-4 w-4 text-emerald-600" />
                          </Button>
                          <Button size="icon" variant="secondary" className="rounded-full bg-white/90 hover:bg-white">
                            <ShoppingCart className="h-4 w-4 text-emerald-600" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-emerald-600">{product.price} EGP</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Opinion Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Community Says</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real feedback from our valued customers who found their perfect treasures
            </p>
          </div>

          <div className="relative h-96 overflow-hidden">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`absolute bg-yellow-100 p-6 rounded-lg shadow-lg border-l-4 border-emerald-400 max-w-xs transform ${review.rotation} transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer`}
                style={{
                  top: `${Math.random() * 60}%`,
                  left: `${(index * 18) + Math.random() * 10}%`,
                  animation: `float 3s ease-in-out infinite ${index * 0.5}s`
                }}
              >
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-3 font-medium leading-relaxed">"{review.text}"</p>
                <p className="text-emerald-600 font-semibold">- {review.author}</p>
              </div>
            ))}
          </div>
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
                <Link to="/clothes" className="block text-gray-300 hover:text-emerald-400 transition-colors">Clothes</Link>
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

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--tw-rotate)); }
          50% { transform: translateY(-10px) rotate(var(--tw-rotate)); }
        }
      `}</style>
    </div>
  );
};

export default Index;
