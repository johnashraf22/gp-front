import { useState } from 'react';
import { Search, Check, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const AdminRates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: "Ahmed Mohamed",
      product: "The Great Gatsby",
      rating: 5,
      comment: "Excellent book condition, fast delivery!",
      date: "2024-01-15",
      status: "pending"
    },
    {
      id: 2,
      user: "Sara Ali",
      product: "Summer Dress",
      rating: 4,
      comment: "Beautiful dress, exactly as described. Love it!",
      date: "2024-01-14",
      status: "pending"
    },
    {
      id: 3,
      user: "Mohamed Hassan",
      product: "Pride and Prejudice",
      rating: 5,
      comment: "Great classic book in perfect condition.",
      date: "2024-01-13",
      status: "approved"
    },
    {
      id: 4,
      user: "Fatima Ahmed",
      product: "Vintage T-Shirt",
      rating: 3,
      comment: "Good quality but delivery was a bit slow.",
      date: "2024-01-12",
      status: "pending"
    }
  ]);

  const handleApprove = (id: number) => {
    setReviews(prev => prev.filter(review => review.id !== id));
    alert(`Review #${id} approved and published!`);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this review?')) {
      setReviews(prev => prev.filter(review => review.id !== id));
      alert(`Review #${id} deleted successfully!`);
    }
  };

  const filteredReviews = reviews.filter(review =>
    review.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.comment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0]">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center bg-gradient-to-r from-emerald-50 to-white rounded-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Reviews & Ratings</h1>
            <p className="text-lg text-gray-600">Monitor and manage product reviews</p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search reviews by user, product, or comment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 bg-white shadow-lg"
              />
            </div>
          </div>

          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <Card key={review.id} className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {review.user.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{review.user}</h3>
                          <p className="text-sm text-gray-600">Product: {review.product}</p>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-semibold ${
                          review.status === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {review.status}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex space-x-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-600">({review.rating}/5)</span>
                        <span className="text-sm text-gray-500">• {review.date}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{review.comment}</p>
                    </div>
                    
                    {review.status === 'pending' && (
                      <div className="flex space-x-2 ml-4">
                        <Button
                          onClick={() => handleApprove(review.id)}
                          className="bg-green-500 hover:bg-green-600 text-white"
                          size="sm"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleDelete(review.id)}
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No reviews found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminRates;