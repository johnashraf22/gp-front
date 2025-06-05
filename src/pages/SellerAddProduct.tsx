import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Plus, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';
import { useNavigate } from 'react-router-dom';

const SellerAddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0.0,
    category: 'books',
    condition: 0,
    quantity: 0
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  const [requestStatus, setRequestStatus] = useState({
    submitted: false,
    approved: false,
    rejected: false,
    rejectionReason: ''
  });

  // Function to get condition label based on star rating
  const getConditionLabel = (rating: number) => {
    switch (rating) {
      case 5: return 'Excellent';
      case 4: return 'Very Good';
      case 3: return 'Good';
      case 2: return 'Fair';
      case 1: return 'Poor';
      default: return 'Not Rated';
    }
  };

  const handleStarClick = (rating: number) => {
    setFormData(prev => ({ ...prev, condition: rating }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: File[] = Array.from(files);
    const newPreviews: string[] = [];

    newImages.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        if (newPreviews.length === newImages.length) {
          setImagePreviews(prev => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Product submitted:', formData);
    setRequestStatus({ ...requestStatus, submitted: true });

    const productData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      productData.append(key, value.toString());
    });

    // Append each image to the FormData
    images.forEach((image, index) => {
      productData.append(`image`, image);
    });

    // Get token from localStorage
    const token = localStorage.getItem('token');

    api.post('/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
    })
    .then(response => {
      console.log('Product submitted:', response.data);
      setRequestStatus({ ...requestStatus, submitted: true });
      navigate('/seller');
    })
    .catch(error => {
      console.error('Product submission failed:', error);
      if (error.response?.status === 401) {
        // Handle unauthorized access
        alert('Please login again to continue');
        navigate('/login');
      } else {
        alert('Failed to submit product. Please try again.');
      }
    });
  };

  const handleContinueListing = () => {
    alert('Redirecting to payment page...');
    // This would redirect to the seller payment page
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0]">
      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Add Product Form */}
          <Card className="bg-white shadow-lg border-0 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-emerald-600">Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Horizontal layout for name and category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-medium">Product Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter product name"
                      className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-gray-700 font-medium">Category</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full p-2 border border-emerald-200 rounded-md focus:border-emerald-500 focus:ring-emerald-500"
                    >
                      <option value="books">Books</option>
                      <option value="clothes">Clothes</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="text-gray-700 font-medium">Price (EGP)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                    placeholder="Enter price"
                    className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>


                {/* Product Condition with Star Rating */}
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Product Condition</Label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 cursor-pointer ${
                          star <= formData.condition ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                        onClick={() => handleStarClick(star)}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Condition: {getConditionLabel(formData.condition)}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700 font-medium">Description</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your product..."
                    rows={4}
                    className="w-full p-2 border border-emerald-200 rounded-md focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">Product Images</Label>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-emerald-200 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors cursor-pointer">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="product-images"
                      />
                      <label htmlFor="product-images" className="cursor-pointer">
                        <Upload className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                        <p className="text-gray-600">Click to upload images or drag and drop</p>
                        <p className="text-sm text-gray-500">PNG, JPG up to 5MB each</p>
                      </label>
                    </div>

                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Product preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white transition-colors shadow-md hover:shadow-lg py-3"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Product Request
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Request Status - Now below the form */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-emerald-600">Request Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                
                {!requestStatus.submitted && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600">Submit your product to see the status here</p>
                  </div>
                )}

                {requestStatus.submitted && !requestStatus.approved && !requestStatus.rejected && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Under Review</h3>
                    <p className="text-gray-600">Your product is being reviewed by our admin team</p>
                  </div>
                )}

                {requestStatus.approved && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                    </div>
                    <h3 className="font-semibold text-green-800 mb-2">Product Approved!</h3>
                    <p className="text-gray-600 mb-4">Your product has been approved for listing</p>
                    <Button 
                      onClick={handleContinueListing}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white"
                    >
                      Continue Listing
                    </Button>
                  </div>
                )}

                {requestStatus.rejected && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                    </div>
                    <h3 className="font-semibold text-red-800 mb-2">Request Rejected</h3>
                    <p className="text-gray-600 mb-2">Unfortunately, your product was not approved</p>
                    {requestStatus.rejectionReason && (
                      <div className="bg-red-50 p-3 rounded-lg">
                        <p className="text-sm text-red-700">
                          <strong>Reason:</strong> {requestStatus.rejectionReason}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Demo buttons for testing different states */}
                <div className="border-t pt-6 space-y-2">
                  <p className="text-sm text-gray-500 mb-2">Demo Controls:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setRequestStatus({ submitted: true, approved: true, rejected: false, rejectionReason: '' })}
                    >
                      Simulate Approval
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setRequestStatus({ submitted: true, approved: false, rejected: true, rejectionReason: 'Product quality does not meet our standards' })}
                    >
                      Simulate Rejection
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SellerAddProduct;