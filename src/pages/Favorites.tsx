import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Star, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Favorites = () => {
  const navigate = useNavigate();
  const [favoriteItems, setFavoriteItems] = useState([
    {
      id: 1,
      name: "The Great Gatsby",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80",
      price: 45,
      rating: 4.5,
      type: "book",
      isFavorite: true,
    },
    {
      id: 2,
      name: "Vintage Denim Jacket",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?auto=format&fit=crop&w=400&q=80",
      price: 120,
      rating: 4.8,
      type: "clothes",
      isFavorite: true,
    },
    {
      id: 3,
      name: "Pride and Prejudice",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80",
      price: 40,
      rating: 4.7,
      type: "book",
      isFavorite: true,
    },
  ]);

  const toggleFavorite = (id: number) => {
    setFavoriteItems(items =>
      items.map(item =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      ).filter(item => item.isFavorite)
    );
  };

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0]">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center bg-gradient-to-r from-emerald-50 to-white rounded-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">My Favorites</h1>
            <p className="text-lg text-gray-600">Your collection of favorite items</p>
          </div>

          {favoriteItems.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">No favorites yet</h2>
              <p className="text-gray-600 mb-8">Start adding items to your wishlist</p>
              <Link to="/books">
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  Browse Products
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {favoriteItems.map((item) => (
                <Card 
                  key={item.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white border-0 shadow-md"
                >
                  <CardContent className="p-0" onClick={() => handleProductClick(item.id)}>
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2 space-x-2 flex">
                        <Button 
                          size="icon"
                          variant="secondary"
                          className="rounded-full bg-white/90 hover:bg-white shadow-md"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item.id);
                          }}
                        >
                          <Heart 
                            className={`h-5 w-5 transition-colors duration-200 ${item.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                          />
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-emerald-600 font-medium mb-1 capitalize">{item.type}</div>
                      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors text-lg">
                        {item.name}
                      </h3>
                      <div className="flex items-center mb-3">
                        <div className="flex items-center space-x-1 mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({item.rating})</span>
                      </div>
                      <div className="text-2xl font-bold text-emerald-600 mb-4">{item.price} EGP</div>
                      <Button 
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-md hover:shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${item.id}`);
                        }}
                      >
                        BUY NOW
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Favorites;
