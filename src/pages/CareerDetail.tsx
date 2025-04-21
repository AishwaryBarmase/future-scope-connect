
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
import { fetchCourseraContent } from '@/utils/courseraApi';
import { getRoadmapLink } from '@/data/careerRoadmaps';

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
  const [courseraArticles, setCourseraArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const { categories, careerOptions } = useCareerOptions();
  const [roadmapLink, setRoadmapLink] = useState<string | null>(null);
  
  // YouTube hook
  const searchTerm = career?.title ? `career in ${career.title}` : '';
  const { videos, loading: videosLoading } = useYouTubeVideos(searchTerm);

  // Get course links
  const fetchCourseraData = async (careerTitle: string) => {
    setCoursesLoading(true);
    setArticlesLoading(true);
    
    try {
      // Fetch from Coursera API
      const result = await fetchCourseraContent(careerTitle);
      
      // Transform course results
      const courses = result.courses.map(course => ({
        name: course.name,
        link: course.link,
        description: `Learn about ${careerTitle} from ${course.partner || 'a leading educational provider'}.`,
        partner: course.partner
      }));
      
      setCourseraResults(courses.length > 0 ? courses : [
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
      ]);
      
      // Process articles
      setCourseraArticles(result.articles.length > 0 ? result.articles : [
        {
          title: `How to Start a Career in ${careerTitle}`,
          link: "https://medium.com/",
          description: `A comprehensive guide to launching your career in ${careerTitle}, including education requirements, job prospects, and salary expectations.`,
          source: "Medium"
        },
        {
          title: `${careerTitle}: Industry Trends for ${new Date().getFullYear()}`,
          link: "https://www.forbes.com/",
          description: `Explore the latest trends, technologies, and opportunities in the ${careerTitle} field that are shaping the industry this year.`,
          source: "Forbes"
        },
        {
          title: `5 Skills You Need to Succeed in ${careerTitle}`,
          link: "https://www.linkedin.com/",
          description: `Industry experts share the most in-demand skills for ${careerTitle} professionals in today's competitive job market.`,
          source: "LinkedIn"
        }
      ]);
    } catch (error) {
      console.error("Error fetching Coursera data:", error);
      setCourseraResults([]);
      setCourseraArticles([]);
    } finally {
      setCoursesLoading(false);
      setArticlesLoading(false);
    }
  };

  useEffect(() => {
    const fetchCareerData = async () => {
      setLoading(true);
      
      try {
        if (!categoryTitle || !careerTitle) {
          throw new Error("Missing category or career title");
        }
        
        // Try to find the category by slug first, then by title if that fails
        let categoryResult = await supabase
          .from('career_categories')
          .select('id, title, slug')
          .eq('slug', categoryTitle.toLowerCase())
          .maybeSingle();
          
        // If no category found by slug, try by title
        if (!categoryResult.data) {
          categoryResult = await supabase
            .from('career_categories')
            .select('id, title, slug')
            .ilike('title', categoryTitle)
            .maybeSingle();
        }
          
        if (!categoryResult.data) {
          throw new Error("Category not found");
        }
        
        setCategory(categoryResult.data);
        
        // Try to find the specific career option by matching title (case insensitive)
        let careerResult = await supabase
          .from('career_options')
          .select('*')
          .eq('category_id', categoryResult.data.id)
          .ilike('title', careerTitle)
          .maybeSingle();
          
        // If no results, create a placeholder career
        if (!careerResult.data) {
          const placeholderCareer: CareerInfo = {
            id: 'placeholder',
            title: careerTitle,
            description: `A career in ${careerTitle} offers exciting opportunities for those interested in ${categoryResult.data.title}. 
            This field combines technical knowledge, problem-solving skills, and creativity to deliver innovative solutions.
            
            Professionals in this area typically need strong analytical abilities, attention to detail, and excellent communication skills. The career path can include roles such as junior ${careerTitle}, senior ${careerTitle}, and ${careerTitle} manager or director.
            
            The industry outlook is promising, with growing demand for skilled professionals and competitive compensation packages. Most positions require a bachelor's degree in a related field, though some may require advanced degrees or specialized certifications.`,
            category_id: categoryResult.data.id,
            keywords: [careerTitle, categoryResult.data.title, 'Professional', 'Career']
          };
          
          setCareer(placeholderCareer);
        } else {
          // Convert any JSON course_links to an array or object before setting state
          const careerInfo: CareerInfo = {
            id: careerResult.data.id,
            title: careerResult.data.title,
            description: careerResult.data.description || `A career in ${careerResult.data.title} offers exciting opportunities in the ${categoryResult.data.title} field.`,
            category_id: careerResult.data.category_id,
            course_links: careerResult.data.course_links,
            keywords: careerResult.data.keywords || [careerResult.data.title, categoryResult.data.title]
          };
          
          setCareer(careerInfo);
        }
        
        // Check if we have a roadmap for this career
        if (careerTitle) {
          const roadmap = getRoadmapLink(careerTitle);
          setRoadmapLink(roadmap);
        }
        
        // Fetch related careers in the same category
        const relatedResult = await supabase
          .from('career_options')
          .select('*')
          .eq('category_id', categoryResult.data.id)
          .not('title', 'ilike', careerTitle)
          .limit(4);
          
        if (relatedResult.error) throw relatedResult.error;
        
        // If we have related careers, use them; otherwise, create placeholders
        if (relatedResult.data && relatedResult.data.length > 0) {
          // Convert the related careers data to our CareerInfo type
          const relatedCareerInfo: CareerInfo[] = relatedResult.data.map(career => ({
            id: career.id,
            title: career.title,
            description: career.description || `A career in ${career.title} offers exciting opportunities in the ${categoryResult.data.title} field.`,
            category_id: career.category_id,
            course_links: career.course_links,
            keywords: career.keywords || [career.title, categoryResult.data.title]
          }));
          
          setRelatedCareers(relatedCareerInfo);
        } else {
          // Create placeholder related careers
          const placeholderRelatedCareers: CareerInfo[] = [
            {
              id: 'related1',
              title: `Senior ${careerTitle}`,
              description: `A senior-level position in the ${careerTitle} field.`,
              category_id: categoryResult.data.id,
              keywords: [`Senior ${careerTitle}`, categoryResult.data.title]
            },
            {
              id: 'related2',
              title: `${careerTitle} Manager`,
              description: `A management position overseeing ${careerTitle} professionals.`,
              category_id: categoryResult.data.id,
              keywords: [`${careerTitle} Manager`, categoryResult.data.title]
            },
            {
              id: 'related3',
              title: `${careerTitle} Specialist`,
              description: `A specialized role in the ${careerTitle} field.`,
              category_id: categoryResult.data.id,
              keywords: [`${careerTitle} Specialist`, categoryResult.data.title]
            }
          ];
          
          setRelatedCareers(placeholderRelatedCareers);
        }
        
        // Fetch course recommendations
        fetchCourseraData(careerTitle);
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
              
              {roadmapLink && (
                <div className="mb-8">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => window.open(roadmapLink, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Career Roadmap
                  </Button>
                </div>
              )}
              
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
                  ) : videos && videos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {videos.map((video, index) => (
                        <div key={index} className="aspect-video">
                          <iframe
                            className="w-full h-full rounded-lg shadow-md"
                            src={video.videoUrl}
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
                  ) : courseraArticles && courseraArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {courseraArticles.map((article, index) => (
                        <ArticleCard
                          key={index}
                          title={article.title}
                          description={article.description || `Read this article about ${career.title} careers and industry insights.`}
                          link={article.link}
                          source={article.source || article.author}
                        />
                      ))}
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
