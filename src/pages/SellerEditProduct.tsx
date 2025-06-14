import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { productApi, UpdateProductPayload, Product } from '@/lib/api';

// Extend Product for seller edit context
interface SellerProduct extends Product {
  description?: string;
  category?: string;
  condition?: string;
  images?: string[];
}

const SellerEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [productData, setProductData] = useState<SellerProduct | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    condition: '',
    price: 0
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const product = await productApi.getProductById(Number(id));
        const productTyped = product as SellerProduct;
        setProductData(productTyped);
        setFormData({
          name: productTyped.name || '',
          description: productTyped.description || '',
          category: productTyped.category || '',
          condition: productTyped.condition || '',
          price: productTyped.price || 0
        });
      } catch (err) {
        setError('Failed to load product data.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Check if there are changes
    const originalData = productData
      ? {
          name: productData.name,
          description: productData.description,
          category: productData.category,
          condition: productData.condition
        }
      : formData;
    
    const newData = {
      ...formData,
      [field]: value
    };
    
    setHasChanges(JSON.stringify(originalData) !== JSON.stringify(newData));
  };

  const handleSave = async () => {
    if (hasChanges) {
      try {
        await productApi.updateProduct(Number(id), formData as UpdateProductPayload);
        alert('Product updated successfully!');
        navigate('/seller/items');
      } catch (error) {
        console.error('Failed to update product:', error);
        alert('Failed to update product. Please try again.');
      }
    }
  };

  const handleClose = () => {
    navigate('/seller/items');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      {loading ? (
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <p className="text-xl text-gray-700">Loading product data...</p>
        </div>
      ) : error ? (
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <p className="text-xl text-red-600">{error}</p>
        </div>
      ) : productData && (
        <Card className="w-full max-w-2xl bg-white shadow-xl border-0 max-h-[90vh] overflow-y-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl text-emerald-600">Edit Product</CardTitle>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Product Images - Read Only */}
            <div>
              <Label className="text-gray-700 font-medium mb-2 block">Product Images (Cannot be changed)</Label>
              <div className="flex space-x-4">
                {productData.images && productData.images.map((image: string, index: number) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`Product ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                  />
                ))}
              </div>
            </div>

            {/* Product Name */}
            <div>
              <Label htmlFor="name" className="text-gray-700 font-medium">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-gray-700 font-medium">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-medium mb-2 block">Price</Label>
              <Input
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="bg-gray-100 border-gray-300"
              />
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category" className="text-gray-700 font-medium">Category</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full p-2 border border-emerald-200 rounded-md focus:border-emerald-500 focus:ring-emerald-500"
              >
                <option value="Books">Books</option>
                <option value="Clothes">Clothes</option>
              </select>
            </div>

            {/* Condition */}
            <div>
              <Label htmlFor="condition" className="text-gray-700 font-medium">Condition</Label>
              <select
                id="condition"
                value={formData.condition}
                onChange={(e) => handleInputChange('condition', e.target.value)}
                className="w-full p-2 border border-emerald-200 rounded-md focus:border-emerald-500 focus:ring-emerald-500"
              >
                <option value="Like New">Like New</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button
                onClick={handleSave}
                disabled={!hasChanges}
                className={`flex-1 ${hasChanges ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-gray-300'} text-white`}
              >
                Save Changes
              </Button>
              <Button
                onClick={handleClose}
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SellerEditProduct;
