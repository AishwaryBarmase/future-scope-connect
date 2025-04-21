
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useYouTubeVideos } from '@/hooks/useYouTubeVideos';
import { ExternalLink } from 'lucide-react';
import { useCareerOptions } from '@/hooks/useCareerOptions';
import axios from 'axios';

interface CareerInfo {
  id: string;
  title: string;
  description: string;
  category_id: string;
  course_links?: any;
  keywords?: string[];
}

interface CourseraResult {
  name: string;
  link: string;
  description: string;
  partner?: string;
}

interface CardProps {
  title: string;
  description: string;
  link: string;
  source?: string;
}

const CourseCard = ({ title, description, link, source }: CardProps) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle className="line-clamp-2 text-lg">
        {title}
      </CardTitle>
      {source && (
        <CardDescription>
          {source}
        </CardDescription>
      )}
    </CardHeader>
    <CardContent className="flex flex-col justify-between h-full gap-4">
      <p className="text-gray-600 line-clamp-3 flex-grow">
        {description}
      </p>
      <Button 
        variant="outline" 
        className="w-full mt-2 gap-1"
        onClick={() => window.open(link, '_blank')}
      >
        View Course <ExternalLink className="h-4 w-4" />
      </Button>
    </CardContent>
  </Card>
);

const ArticleCard = ({ title, description, link, source }: CardProps) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle className="line-clamp-2 text-lg">
        {title}
      </CardTitle>
      {source && (
        <CardDescription>
          {source}
        </CardDescription>
      )}
    </CardHeader>
    <CardContent className="flex flex-col justify-between h-full gap-4">
      <p className="text-gray-600 line-clamp-3 flex-grow">
        {description}
      </p>
      <Button 
        variant="outline" 
        className="w-full mt-2 gap-1"
        onClick={() => window.open(link, '_blank')}
      >
        Read Article <ExternalLink className="h-4 w-4" />
      </Button>
    </CardContent>
  </Card>
);

const CareerDetail = () => {
  const { categoryTitle, careerTitle } = useParams<{ categoryTitle: string, careerTitle: string }>();
  const [career, setCareer] = useState<CareerInfo | null>(null);
  const [relatedCareers, setRelatedCareers] = useState<CareerInfo[]>([]);
  const [category, setCategory] = useState<{ title: string, id: string } | null>(null);
  const [courseraResults, setCourseraResults] = useState<CourseraResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const { categories, careerOptions } = useCareerOptions();
  
  // YouTube hook
  const searchTerm = career?.title ? `career in ${career.title}` : '';
  const { videos, loading: videosLoading } = useYouTubeVideos(searchTerm);

  // Get course links
  const fetchCourseraData = async (careerTitle: string) => {
    setCoursesLoading(true);
    try {
      // We'll use a mock API for now, but this could be replaced with a real API call
      const mockCourses: CourseraResult[] = [
        {
          name: `Introduction to ${careerTitle}`,
          link: "https://www.coursera.org/",
          description: `Learn the fundamentals of ${careerTitle} and get started on your path to becoming a professional.`,
          partner: "University of California"
        },
        {
          name: `Advanced ${careerTitle} Techniques`,
          link: "https://www.coursera.org/",
          description: `Take your ${careerTitle} skills to the next level with advanced techniques and methodologies.`,
          partner: "Stanford University"
        },
        {
          name: `${careerTitle} Certification Program`,
          link: "https://www.coursera.org/",
          description: `Get certified in ${careerTitle} and boost your career prospects with this comprehensive program.`,
          partner: "Google"
        },
        {
          name: `${careerTitle} for Beginners`,
          link: "https://www.coursera.org/",
          description: `No prior experience needed. This course will guide you through the basics of ${careerTitle}.`,
          partner: "IBM"
        }
      ];
      
      setCourseraResults(mockCourses);
    } catch (error) {
      console.error("Error fetching Coursera data:", error);
      setCourseraResults([]);
    } finally {
      setCoursesLoading(false);
    }
  };

  const fetchArticleData = async (searchTerm: string) => {
    // This would normally be a real API call, but we'll use mock data
    setArticlesLoading(true);
    try {
      const mockArticles = [
        {
          name: `How to Start a Career in ${searchTerm}`,
          link: "https://medium.com/",
          description: `A comprehensive guide to launching your career in ${searchTerm}, including education requirements, job prospects, and salary expectations.`,
          source: "Medium"
        },
        {
          name: `${searchTerm}: Industry Trends for ${new Date().getFullYear()}`,
          link: "https://www.forbes.com/",
          description: `Explore the latest trends, technologies, and opportunities in the ${searchTerm} field that are shaping the industry this year.`,
          source: "Forbes"
        },
        {
          name: `5 Skills You Need to Succeed in ${searchTerm}`,
          link: "https://www.linkedin.com/",
          description: `Industry experts share the most in-demand skills for ${searchTerm} professionals in today's competitive job market.`,
          source: "LinkedIn"
        }
      ];
      return mockArticles;
    } catch (error) {
      console.error("Error fetching articles:", error);
      return [];
    } finally {
      setArticlesLoading(false);
    }
  };

  useEffect(() => {
    const fetchCareerData = async () => {
      setLoading(true);
      
      try {
        // First find the category
        const categoryResult = await supabase
          .from('career_categories')
          .select('id, title')
          .eq('slug', categoryTitle)
          .single();
          
        if (categoryResult.error) throw categoryResult.error;
        setCategory(categoryResult.data);
        
        // Then find the specific career option
        const careerResult = await supabase
          .from('career_options')
          .select('*')
          .eq('category_id', categoryResult.data.id)
          .eq('title', careerTitle)
          .single();
          
        if (careerResult.error) throw careerResult.error;
        
        // Convert any JSON course_links to an array or object before setting state
        const careerInfo: CareerInfo = {
          id: careerResult.data.id,
          title: careerResult.data.title,
          description: careerResult.data.description,
          category_id: careerResult.data.category_id,
          course_links: careerResult.data.course_links,
          keywords: careerResult.data.keywords
        };
        
        setCareer(careerInfo);
        
        // Fetch related careers in the same category
        const relatedResult = await supabase
          .from('career_options')
          .select('*')
          .eq('category_id', categoryResult.data.id)
          .neq('title', careerTitle)
          .limit(4);
          
        if (relatedResult.error) throw relatedResult.error;
        
        // Convert the related careers data to our CareerInfo type
        const relatedCareerInfo: CareerInfo[] = relatedResult.data.map(career => ({
          id: career.id,
          title: career.title,
          description: career.description,
          category_id: career.category_id,
          course_links: career.course_links,
          keywords: career.keywords
        }));
        
        setRelatedCareers(relatedCareerInfo);
        
        // Fetch course recommendations
        fetchCourseraData(careerTitle || '');
        
        // Fetch article data
        const articles = await fetchArticleData(careerTitle || '');
        
      } catch (error) {
        console.error("Error fetching career data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (categoryTitle && careerTitle) {
      fetchCareerData();
    }
  }, [categoryTitle, careerTitle]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!career || !category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Career Not Found</h2>
            <p className="mb-6">The career you're looking for doesn't exist or has been moved.</p>
            <Link to="/#careers">
              <Button>Explore Other Careers</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Career Details */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <nav className="flex mb-4" aria-label="Breadcrumb">
                  <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                      <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">Home</Link>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <span className="mx-2 text-gray-400">/</span>
                        <Link to="/#careers" className="text-sm text-gray-500 hover:text-gray-700">Careers</Link>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <span className="mx-2 text-gray-400">/</span>
                        <span className="text-sm text-gray-500">{category.title}</span>
                      </div>
                    </li>
                    <li aria-current="page">
                      <div className="flex items-center">
                        <span className="mx-2 text-gray-400">/</span>
                        <span className="text-sm font-medium text-gray-700">{career.title}</span>
                      </div>
                    </li>
                  </ol>
                </nav>
                
                <h1 className="text-3xl font-bold gradient-text mb-4">{career.title}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  {career.keywords?.map((keyword, index) => (
                    <span key={index} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="prose max-w-none mb-8">
                <p className="text-lg text-gray-700 whitespace-pre-line">
                  {career.description || 
                    `A career in ${career.title} offers exciting opportunities for those interested in ${category.title}. 
                    This field combines technical knowledge, problem-solving skills, and creativity to deliver innovative solutions.
                    
                    Professionals in this area typically need strong analytical abilities, attention to detail, and excellent communication skills. The career path can include roles such as junior ${career.title}, senior ${career.title}, and ${career.title} manager or director.
                    
                    The industry outlook is promising, with growing demand for skilled professionals and competitive compensation packages. Most positions require a bachelor's degree in a related field, though some may require advanced degrees or specialized certifications.`
                  }
                </p>
              </div>
              
              <Tabs defaultValue="courses" className="mb-10">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="courses">Recommended Courses</TabsTrigger>
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                  <TabsTrigger value="articles">Articles</TabsTrigger>
                </TabsList>
                
                <TabsContent value="courses" className="mt-0">
                  {coursesLoading ? (
                    <div className="flex justify-center py-10">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  ) : courseraResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {courseraResults.map((course, index) => (
                        <CourseCard
                          key={index}
                          title={course.name}
                          description={course.description}
                          link={course.link}
                          source={course.partner}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">No courses found for this career.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="videos" className="mt-0">
                  {videosLoading ? (
                    <div className="flex justify-center py-10">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  ) : videos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {videos.map((video, index) => (
                        <div key={index} className="aspect-video">
                          <iframe
                            className="w-full h-full rounded-lg shadow-md"
                            src={`https://www.youtube.com/embed/${video.id}`}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">No videos found for this career.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="articles" className="mt-0">
                  {articlesLoading ? (
                    <div className="flex justify-center py-10">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ArticleCard
                        title={`How to Start a Career in ${career.title}`}
                        description={`A comprehensive guide to launching your career in ${career.title}, including education requirements, job prospects, and salary expectations.`}
                        link="https://medium.com/"
                        source="Medium"
                      />
                      <ArticleCard
                        title={`${career.title}: Industry Trends for ${new Date().getFullYear()}`}
                        description={`Explore the latest trends, technologies, and opportunities in the ${career.title} field that are shaping the industry this year.`}
                        link="https://www.forbes.com/"
                        source="Forbes"
                      />
                      <ArticleCard
                        title={`5 Skills You Need to Succeed in ${career.title}`}
                        description={`Industry experts share the most in-demand skills for ${career.title} professionals in today's competitive job market.`}
                        link="https://www.linkedin.com/"
                        source="LinkedIn"
                      />
                      <ArticleCard
                        title={`Day in the Life: ${career.title} Professional`}
                        description={`Get an inside look at what it's really like to work as a ${career.title} professional, from daily tasks to challenges and rewards.`}
                        link="https://www.indeed.com/"
                        source="Indeed"
                      />
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Sidebar */}
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Related Careers</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {relatedCareers.map(relatedCareer => (
                      <li key={relatedCareer.id}>
                        <Link 
                          to={`/career/${categoryTitle}/${relatedCareer.title}`}
                          className="text-primary hover:underline block py-1"
                        >
                          {relatedCareer.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Explore Other Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {categories.filter(cat => cat.id !== category.id).slice(0, 5).map(cat => (
                      <li key={cat.id}>
                        <Link 
                          to={`/#careers`}
                          className="text-gray-700 hover:text-primary block py-1"
                        >
                          {cat.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CareerDetail;
