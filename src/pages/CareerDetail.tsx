
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
import { fetchCourseraContent } from '@/utils/courseraApi';
import { getRoadmapLink } from '@/data/careerRoadmaps';

interface CourseraArticle {
  title: string;
  link: string;
  author?: string;
}

const CareerDetail = () => {
  const { categoryTitle, careerTitle } = useParams<{ categoryTitle: string; careerTitle?: string }>();
  const { categories, careerOptions, loading: loadingOptions } = useCareerOptions();
  const [courseraContent, setCourseraContent] = useState<{ courses: any[], articles: CourseraArticle[] }>({ 
    courses: [], 
    articles: [] 
  });
  
  const decodedCategoryTitle = categoryTitle ? decodeURIComponent(categoryTitle) : '';
  const decodedCareerTitle = careerTitle ? decodeURIComponent(careerTitle) : '';
  
  const category = categories.find(cat => cat.title === decodedCategoryTitle);
  const careerOptionsInCategory = careerOptions.filter(option => 
    option.category_id === category?.id
  );
  
  const selectedCareer = careerTitle 
    ? careerOptionsInCategory.find(option => option.title === decodedCareerTitle)
    : null;

  const searchQuery = selectedCareer 
    ? `${selectedCareer.title} career guide` 
    : `${decodedCategoryTitle} careers guide`;

  const { videos, loading: loadingVideos } = useYouTubeVideos(searchQuery, 6);
  const roadmapLink = selectedCareer ? getRoadmapLink(selectedCareer.title) : null;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const content = await fetchCourseraContent(searchQuery);
        setCourseraContent(content);
      } catch (error) {
        console.error("Error fetching Coursera content:", error);
        // Provide fallback content in case of API error
        setCourseraContent({
          courses: [
            { name: "Introduction to the Field", partner: "FutureScope University", link: "https://www.coursera.org" },
            { name: "Fundamentals and Best Practices", partner: "Career Academy", link: "https://www.coursera.org" },
            { name: "Advanced Skills Development", partner: "Professional Institute", link: "https://www.coursera.org" }
          ],
          articles: [
            { title: "Getting Started in Your Career", link: "https://www.coursera.org" },
            { title: "Industry Trends and Insights", link: "https://www.coursera.org" },
            { title: "Skills That Will Make You Stand Out", link: "https://www.coursera.org" }
          ]
        });
      }
    };
    
    fetchContent();
  }, [searchQuery]);

  if (loadingOptions) {
    return <div className="text-center py-20 min-h-screen">Loading career information...</div>;
  }

  // Split videos into two rows
  const firstRowVideos = videos.slice(0, 3);
  const secondRowVideos = videos.slice(3, 6);

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
              <div className="space-y-4">
                <p className="text-lg text-gray-700">
                  {selectedCareer.description}
                </p>
                {roadmapLink && (
                  <div className="mt-4">
                    <Button
                      onClick={() => window.open(roadmapLink, '_blank')}
                      className="bg-primary hover:bg-primary/90"
                    >
                      View Career Roadmap
                    </Button>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* YouTube Videos Section - First Row */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">Career Guide Videos</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {loadingVideos ? (
                <div className="col-span-full text-center py-8">Loading videos...</div>
              ) : firstRowVideos.length === 0 ? (
                <div className="col-span-full text-center py-8">No videos found</div>
              ) : (
                firstRowVideos.map(video => (
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

          {/* YouTube Videos Section - Second Row (Playlists) */}
          {secondRowVideos.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Related Playlists</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {secondRowVideos.map(video => (
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
                ))}
              </div>
            </section>
          )}

          {/* Course Recommendations Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Recommended Courses</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {courseraContent.courses.length === 0 ? (
                <div className="col-span-full text-center py-8">No courses found</div>
              ) : (
                courseraContent.courses.map((course, index) => (
                  <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{course.name}</h3>
                          <p className="text-sm text-gray-600">Provider: {course.partner}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.open(course.link, '_blank')}
                      >
                        View Course
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </section>

          {/* Articles Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseraContent.articles.length === 0 ? (
                <div className="col-span-full text-center py-8">No articles found</div>
              ) : (
                courseraContent.articles.map((article, index) => (
                  <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                      {article.author && (
                        <p className="text-sm text-gray-600 mb-4">By: {article.author}</p>
                      )}
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.open(article.link, '_blank')}
                      >
                        Read Article
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareerDetail;
