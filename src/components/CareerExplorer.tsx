
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCareerOptions } from '@/hooks/useCareerOptions';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

// Custom ordering for categories
const CATEGORY_ORDER = [
  "Technology and Engineering",
  "Business and Management",
  "Healthcare and Medicine",
  "Creative Arts and Design",
  "Education and Teaching",
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
    navigate(`/career/${encodeURIComponent(categoryTitle)}/${encodeURIComponent(careerTitle)}`);
  };

  const handleCategoryClick = (categoryTitle: string) => {
    navigate(`/career/${encodeURIComponent(categoryTitle)}`);
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
              <Accordion type="single" collapsible>
                {careerOptions
                  .filter(option => option.category_id === category.id)
                  .map(option => (
                    <AccordionItem key={option.id} value={option.id}>
                      <AccordionTrigger>
                        {option.title}
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 p-4 bg-gray-50">
                        <p>{option.description}</p>
                        <Button 
                          onClick={() => handleCareerClick(category.title, option.title)}
                          className="w-full"
                        >
                          Explore {option.title}
                        </Button>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CareerExplorer;
