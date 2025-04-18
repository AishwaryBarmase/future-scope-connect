
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useCareerOptions } from '@/hooks/useCareerOptions';
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';
import { Home, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Course {
  title: string;
  provider: string;
  url: string;
}

const CareerDetail = () => {
  const { categoryTitle, careerTitle } = useParams<{ categoryTitle: string; careerTitle?: string }>();
  const { categories, careerOptions, loading: loadingOptions } = useCareerOptions();
  const [courses, setCourses] = useState<Course[]>([]);
  
  // Decode URL parameters
  const decodedCategoryTitle = categoryTitle ? decodeURIComponent(categoryTitle) : '';
  const decodedCareerTitle = careerTitle ? decodeURIComponent(careerTitle) : '';
  
  // Find the matching category and options
  const category = categories.find(cat => cat.title === decodedCategoryTitle);
  const careerOptionsInCategory = careerOptions.filter(option => 
    option.category_id === category?.id
  );
  
  // Get the specific career if careerTitle is provided
  const selectedCareer = careerTitle 
    ? careerOptionsInCategory.find(option => option.title === decodedCareerTitle)
    : null;

  // Determine the search query based on whether a specific career or just a category is selected
  const searchQuery = selectedCareer 
    ? `${selectedCareer.title} career guide` 
    : `${decodedCategoryTitle} careers guide`;

  const { videos, loading: loadingVideos } = useYouTubeVideos(searchQuery, 6);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://api.example.com/courses'); // You'll need to implement this endpoint
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Fallback to mock data for now
        const mockCourses: Course[] = [
          { 
            title: `Introduction to ${selectedCareer?.title || decodedCategoryTitle}`, 
            provider: 'Coursera', 
            url: 'https://www.coursera.org' 
          },
          { 
            title: `Advanced ${selectedCareer?.title || decodedCategoryTitle}`, 
            provider: 'edX', 
            url: 'https://www.edx.org' 
          },
          { 
            title: `${selectedCareer?.title || decodedCategoryTitle} Specialization`, 
            provider: 'Coursera', 
            url: 'https://www.coursera.org' 
          }
        ];
        setCourses(mockCourses);
      }
    };
    
    fetchCourses();
  }, [decodedCategoryTitle, selectedCareer]);

  if (loadingOptions) {
    return <div className="text-center py-20 min-h-screen">Loading career information...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-purple-50">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Home size={16} /> Home
                </Button>
              </Link>
              <Link to="/#careers">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowLeft size={16} /> Back to Careers
                </Button>
              </Link>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              {selectedCareer?.title || `${decodedCategoryTitle} Careers`}
            </h1>
            {selectedCareer && (
              <p className="text-lg text-gray-700 mb-4">
                {selectedCareer.description}
              </p>
            )}
          </motion.div>

          {/* YouTube Videos Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">
              Career Guide Videos
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loadingVideos ? (
                <div className="col-span-full text-center py-8">Loading videos...</div>
              ) : videos.length === 0 ? (
                <div className="col-span-full text-center py-8">No videos found</div>
              ) : (
                videos.map(video => (
                  <motion.div 
                    key={video.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white rounded-lg overflow-hidden shadow-md"
                  >
                    <div className="aspect-video">
                      <iframe
                        src={video.videoUrl}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-sm line-clamp-2 h-10">
                        {video.title}
                      </h4>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </section>

          {/* Course Recommendations Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">
              Recommended Courses
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {courses.map((course, index) => (
                <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                        <p className="text-sm text-gray-600">Provider: {course.provider}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.open(course.url, '_blank')}
                    >
                      View Course
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareerDetail;
