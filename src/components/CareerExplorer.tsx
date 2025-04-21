
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCareerOptions } from '@/hooks/useCareerOptions';

// Custom ordering for categories with updated names
const CATEGORY_ORDER = [
  "Technology & Engineering",
  "Business & Management",
  "Health & Science",
  "Education & Academia",
  "Creative & Media",
  "Miscellaneous"
];

const CareerExplorer: React.FC = () => {
  const { categories, careerOptions, loading: loadingOptions } = useCareerOptions();
  const [orderedCategories, setOrderedCategories] = useState<any[]>([]);
  const navigate = useNavigate();

  // Order categories according to the specified order
  useEffect(() => {
    if (categories.length > 0) {
      const ordered = [...categories].sort((a, b) => {
        const indexA = CATEGORY_ORDER.indexOf(a.title);
        const indexB = CATEGORY_ORDER.indexOf(b.title);
        
        // If category not in our order list, put at the end
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        
        return indexA - indexB;
      });
      
      setOrderedCategories(ordered);
    }
  }, [categories]);

  const handleCareerClick = (categoryTitle: string, careerTitle: string) => {
    // Fixed navigation - use slugs if available, otherwise use the titles
    const categorySlug = categories.find(cat => cat.title === categoryTitle)?.slug || categoryTitle;
    navigate(`/career/${encodeURIComponent(categorySlug)}/${encodeURIComponent(careerTitle)}`);
  };

  const handleCategoryClick = (categoryTitle: string) => {
    // Fixed navigation - use slugs if available, otherwise use the titles
    const categorySlug = categories.find(cat => cat.title === categoryTitle)?.slug || categoryTitle;
    navigate(`/career/${encodeURIComponent(categorySlug)}`);
  };

  if (loadingOptions) {
    return <div className="text-center py-10">Loading career options...</div>;
  }

  return (
    <div id="careers" className="container mx-auto px-4 py-12 bg-gradient-to-br from-purple-50 to-blue-50">
      <h2 className="text-4xl font-bold text-center mb-10 gradient-text">
        Explore Career Paths
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {orderedCategories.map(category => (
          <Card key={category.id} className="bg-white shadow-lg hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle 
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleCategoryClick(category.title)}
              >
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {careerOptions
                  .filter(option => option.category_id === category.id)
                  .map(option => (
                    <div
                      key={option.id}
                      onClick={() => handleCareerClick(category.title, option.title)}
                      className="p-3 rounded-md hover:bg-gray-50 cursor-pointer transition-colors text-gray-700 hover:text-primary"
                    >
                      {option.title}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CareerExplorer;
