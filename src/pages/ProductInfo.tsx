import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useSoldOut } from '@/contexts/SoldOutContext';
import { useUser } from '@/contexts/UserContext';
import SoldOutStripe from '@/components/SoldOutStripe';
import api, { productApi } from '@/lib/api';

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  rating: number;
  image: string;
  type: 'book' | 'clothes';
  size?: string;
}

interface Comment {
  id: number;
  user: string;
  comment: string;
  rating: number;
  date: string;
}

const ProductInfo = () => {
  const { id } = useParams(); // Get product ID from URL
  const [newComment, setNewComment] = useState('');
  const { isProductSoldOut } = useSoldOut();
  const { isLoggedIn } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch product details
        const productResponse = await productApi.getProductById(Number(id));
        console.log( "productResponse", productResponse);
        setProduct(productResponse);
        
        // Fetch product comments
        // const commentsResponse = await api.get(`/products/${id}/comments`);
        setComments([]);
        
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]);

  const handleAddComment = async () => {
    if (!isLoggedIn) {
      alert("Please log in to add a comment");
      return;
    }
    
    if (!newComment.trim()) return;

    try {
      const response = await api.post(`/products/${id}/comments`, {
        comment: newComment,
        rating: 5 // You might want to add a rating input
      });
      
      // Add the new comment to the list
      setComments(prev => [...prev, response.data]);
      setNewComment('');
      alert("Comment added successfully!");
    } catch (err) {
      console.error('Error adding comment:', err);
      alert("Failed to add comment. Please try again.");
    }
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      alert("Please log in to add items to cart");
      return;
    }

    try {
      await api.post('/cart', { product_id: id });
      alert("Item added to cart successfully!");
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  const handleAddToFavorites = async () => {
    if (!isLoggedIn) {
      alert("Please log in to add items to favorites");
      return;
    }

    try {
      await api.post('/favorites', { productId: id });
      alert("Item added to favorites successfully!");
    } catch (err) {
      console.error('Error adding to favorites:', err);
      alert("Failed to add item to favorites. Please try again.");
    }
  };

  const handleOrder = async () => {
    if (!isLoggedIn) {
      alert("Please log in to place an order");
      return;
    }
    try {
      await api.post('/cart', { product_id: id });
      navigate('/cart');
    } catch (err) {
      alert('Failed to add to cart. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F6F0] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600 mx-auto" />
          <p className="mt-2 text-gray-600">Loading product information...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#F8F6F0] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-medium">{error || 'Product not found'}</p>
          <Link to="/products" className="mt-4 text-emerald-600 hover:text-emerald-700">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F0]">
      {/* Product Details */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Carousel */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg bg-white">
                {isProductSoldOut(product.id) && <SoldOutStripe />}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="text-gray-600 ml-2">({product.rating})</span>
                  </div>
                  <span className="text-3xl font-bold text-emerald-600">{product.price} EGP</span>
                </div>
                {product.size && (
                  <p className="text-lg text-gray-600 mb-4"><strong>Size:</strong> {product.size}</p>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 transition-colors"
                    onClick={handleAddToFavorites}
                    disabled={isProductSoldOut(product.id)}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 transition-colors"
                    onClick={handleAddToCart}
                    disabled={isProductSoldOut(product.id)}
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </div>
                <Button 
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-md hover:shadow-lg py-3 text-lg"
                  onClick={handleOrder}
                  disabled={isProductSoldOut(product.id)}
                >
                  Order Now
                </Button>
                {isProductSoldOut(product.id) && (
                  <p className="text-yellow-800 text-center font-medium">
                    This item is currently sold out
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Customer Reviews ({comments.length})
            </h2>
            
            {/* Add Comment */}
            <Card className="bg-white shadow-lg border-0 mb-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Your Comment</h3>
                <div className="space-y-4">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts about this product..."
                    className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                    rows={4}
                  />
                  <Button 
                    onClick={handleAddComment}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-md hover:shadow-lg"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Comment
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-gray-600 text-center py-8">No reviews yet. Be the first to review this product!</p>
              ) : (
                comments.map((comment) => (
                  <Card key={comment.id} className="bg-white shadow-lg border-0">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-800">{comment.user}</h4>
                          <div className="flex items-center space-x-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < comment.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{comment.date}</span>
                      </div>
                      <p className="text-gray-600">{comment.comment}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductInfo;