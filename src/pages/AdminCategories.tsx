import { useState, useEffect } from 'react';
import { Search, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const AdminCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [showSubcategoryInput, setShowSubcategoryInput] = useState<number | null>(null);
  const [newSubcategory, setNewSubcategory] = useState('');

  // Load categories from localStorage on component mount
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('adminCategories');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: 1,
        name: "Books",
        subcategories: ["Fiction", "Non-Fiction", "Educational", "Comics", "Poetry"]
      },
      {
        id: 2,
        name: "Clothes",
        subcategories: ["T-Shirts", "Tops", "Pants", "Jackets", "Dresses", "Skirts"]
      }
    ];
  });

  // Save categories to localStorage whenever categories change
  useEffect(() => {
    localStorage.setItem('adminCategories', JSON.stringify(categories));
  }, [categories]);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newId = Math.max(...categories.map(c => c.id)) + 1;
      const newCat = {
        id: newId,
        name: newCategory.trim(),
        subcategories: []
      };
      setCategories(prev => [...prev, newCat]);
      setNewCategory('');
      
      console.log(`Creating new category page for: ${newCat.name}`);
      console.log(`Adding ${newCat.name} to navbar`);
      alert(`Category "${newCat.name}" added successfully and will appear in the navbar!`);
    }
  };

  const handleAddSubcategory = (categoryId: number) => {
    if (newSubcategory.trim()) {
      setCategories(prev => prev.map(category => 
        category.id === categoryId 
          ? { ...category, subcategories: [...category.subcategories, newSubcategory.trim()] }
          : category
      ));
      
      const category = categories.find(c => c.id === categoryId);
      console.log(`Adding subcategory "${newSubcategory}" to ${category?.name} page`);
      
      setNewSubcategory('');
      setShowSubcategoryInput(null);
      alert(`Subcategory "${newSubcategory}" added successfully and will appear in the ${category?.name} page!`);
    }
  };

  const handleDeleteCategory = (categoryId: number, categoryName: string) => {
    if (confirm(`Are you sure you want to delete the category "${categoryName}" and all its subcategories? This will also remove it from the navbar.`)) {
      setCategories(prev => prev.filter(category => category.id !== categoryId));
      console.log(`Removing ${categoryName} from navbar and deleting its page`);
      alert(`Category "${categoryName}" deleted successfully!`);
    }
  };

  const handleDeleteSubcategory = (categoryId: number, subcategory: string) => {
    if (confirm(`Are you sure you want to delete the subcategory "${subcategory}"?`)) {
      setCategories(prev => prev.map(category => 
        category.id === categoryId 
          ? { ...category, subcategories: category.subcategories.filter(sub => sub !== subcategory) }
          : category
      ));
      const category = categories.find(c => c.id === categoryId);
      console.log(`Removing subcategory "${subcategory}" from ${category?.name} page`);
      alert(`Subcategory "${subcategory}" deleted successfully!`);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subcategories.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#F8F6F0]">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center bg-gradient-to-r from-emerald-50 to-white rounded-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Categories</h1>
            <p className="text-lg text-gray-600">Manage and organize product categories</p>
          </div>


          {/* Content */}
          <section className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
              
              {/* Add New Category */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-emerald-600">Add New Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Input
                      type="text"
                      placeholder="Category name..."
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="flex-1 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                    <Button
                      onClick={handleAddCategory}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Category
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Existing Categories */}
              <div className="space-y-6">
                {filteredCategories.map((category) => (
                  <Card key={category.id} className="bg-white shadow-lg border-0">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-gray-800">{category.name}</CardTitle>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => setShowSubcategoryInput(category.id)}
                            variant="outline"
                            size="sm"
                            className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Subcategory
                          </Button>
                          <Button
                            onClick={() => handleDeleteCategory(category.id, category.name)}
                            variant="outline"
                            size="sm"
                            className="border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete Category
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Add Subcategory Input */}
                      {showSubcategoryInput === category.id && (
                        <div className="mb-4 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                          <div className="flex space-x-2">
                            <Input
                              type="text"
                              placeholder="Subcategory name..."
                              value={newSubcategory}
                              onChange={(e) => setNewSubcategory(e.target.value)}
                              className="flex-1 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                            />
                            <Button
                              onClick={() => handleAddSubcategory(category.id)}
                              className="bg-emerald-500 hover:bg-emerald-600 text-white"
                              size="sm"
                            >
                              Add
                            </Button>
                            <Button
                              onClick={() => setShowSubcategoryInput(null)}
                              variant="outline"
                              size="sm"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Subcategories Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {category.subcategories.map((subcategory, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100"
                          >
                            <span className="text-gray-700 font-medium">{subcategory}</span>
                            <Button
                              onClick={() => handleDeleteSubcategory(category.id, subcategory)}
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:bg-red-100 h-6 w-6 p-0"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      {category.subcategories.length === 0 && (
                        <p className="text-gray-500 text-center py-4">No subcategories yet</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default AdminCategories;