
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const SellerEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock product data - in real app would fetch from database
  const [productData, setProductData] = useState({
    id: Number(id),
    name: "The Great Gatsby",
    description: "Classic American novel in excellent condition. This timeless masterpiece explores themes of wealth, love, and the American Dream in the Jazz Age.",
    price: 45,
    category: "Books",
    condition: "Like New",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80"
    ]
  });

  const [formData, setFormData] = useState({
    name: productData.name,
    description: productData.description,
    category: productData.category,
    condition: productData.condition
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Check if there are changes
    const originalData = {
      name: productData.name,
      description: productData.description,
      category: productData.category,
      condition: productData.condition
    };
    
    const newData = {
      ...formData,
      [field]: value
    };
    
    setHasChanges(JSON.stringify(originalData) !== JSON.stringify(newData));
  };

  const handleSave = () => {
    if (hasChanges) {
      alert('Product updated successfully!');
      navigate('/seller/items');
    }
  };

  const handleClose = () => {
    navigate('/seller/items');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
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
              {productData.images.map((image, index) => (
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

          {/* Price - Read Only */}
          <div>
            <Label className="text-gray-700 font-medium mb-2 block">Price (Cannot be changed)</Label>
            <Input
              value={`${productData.price} EGP`}
              disabled
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
    </div>
  );
};

export default SellerEditProduct;
