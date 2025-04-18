
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCareerOptions } from '@/hooks/useCareerOptions';
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { PlayIcon } from 'lucide-react';

const CareerExplorer: React.FC = () => {
  const { categories, careerOptions, loading: loadingOptions } = useCareerOptions();
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const { videos, loading: loadingVideos } = useYouTubeVideos(selectedCareer || '', 3);

  if (loadingOptions) {
    return <div className="text-center py-10">Loading career options...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-gradient-to-br from-purple-50 to-blue-50">
      <h2 className="text-4xl font-bold text-center mb-10 gradient-text">
        Explore Career Paths
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {categories.map(category => (
          <Card key={category.id} className="bg-white shadow-lg hover:shadow-xl transition-all">
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
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
                          variant="outline" 
                          onClick={() => setSelectedCareer(option.title)}
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

      {selectedCareer && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-2xl font-semibold mb-6">
            {selectedCareer} Career Resources
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {loadingVideos ? (
              <div>Loading career videos...</div>
            ) : (
              videos.map(video => (
                <motion.div 
                  key={video.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-100 rounded-lg overflow-hidden shadow-md"
                >
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-medium text-sm mb-2 line-clamp-2">
                      {video.title}
                    </h4>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(video.videoUrl, '_blank')}
                    >
                      <PlayIcon className="mr-2 h-4 w-4" /> Watch Video
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CareerExplorer;
