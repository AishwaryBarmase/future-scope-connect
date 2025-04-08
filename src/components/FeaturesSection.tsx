
import { 
  Brain, 
  LineChart, 
  FileText, 
  MessageSquare,
  Briefcase, 
  Award, 
  TrendingUp,
  Calendar,
  PieChart,
  Layers,
  BookOpen,
  Compass
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const FeaturesSection = () => {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
  
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "AI Career Matching",
      description: "Our advanced algorithms analyze your profile and preferences to suggest ideal career paths.",
      details: "Using machine learning and data from millions of career trajectories, we identify patterns that match your unique skillset and preferences to potential careers you might never have considered."
    },
    {
      icon: <LineChart className="h-8 w-8 text-primary" />,
      title: "Skills Gap Analysis",
      description: "Identify missing skills needed for your desired career and get personalized learning recommendations.",
      details: "We compare your current skillset with the requirements of your target career, then create a personalized learning path to help you bridge those gaps efficiently."
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Resume Assistant",
      description: "AI-powered tools to craft the perfect resume tailored to your target roles.",
      details: "Our AI analyzes successful resumes in your target industry and provides actionable suggestions to help your application stand out to both human recruiters and applicant tracking systems."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "AI Career Coach",
      description: "Get personalized advice and answers to your career questions from our AI coach.",
      details: "Available 24/7, our AI coach draws from the collective wisdom of career experts to provide guidance on job searches, interview preparation, and career development strategies."
    },
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: "Job Matching",
      description: "Discover job opportunities that match your profile with personalized recommendations.",
      details: "We continuously scan thousands of job postings to find positions that align with your skills, preferences, and career goals, helping you focus your job search on the most promising opportunities."
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Skill Certifications",
      description: "Earn certificates for completed skill assessments to enhance your professional profile.",
      details: "Complete our industry-recognized skill assessments to earn digital badges and certificates that can be shared directly on your LinkedIn profile and resume."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Growth Tracking",
      description: "Monitor your progress towards career goals with interactive dashboards.",
      details: "Visualize your career progression with customizable dashboards that track skill development, application success rates, and progress toward your defined career milestones."
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Learning Scheduler",
      description: "Plan your skill development with personalized learning schedules.",
      details: "Our smart scheduling system integrates with your calendar to recommend optimal times for skill development activities, ensuring consistent progress even with a busy schedule."
    },
    {
      icon: <PieChart className="h-8 w-8 text-primary" />,
      title: "Performance Analytics",
      description: "Compare your assessment results with peers and industry standards.",
      details: "Understand how your skills and abilities compare to others in your target field, identifying your competitive advantages and areas for improvement."
    },
    {
      icon: <Layers className="h-8 w-8 text-primary" />,
      title: "Industry Insights",
      description: "Access up-to-date information about trends and opportunities in various industries.",
      details: "Stay informed about emerging trends, salary expectations, and growth forecasts for different industries and roles to make data-driven career decisions."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Learning Resources",
      description: "Curated learning materials to help you develop critical skills for your career path.",
      details: "Access a library of courses, tutorials, and reading materials specifically selected to help you develop the skills most valuable for your career trajectory."
    },
    {
      icon: <Compass className="h-8 w-8 text-primary" />,
      title: "Career Exploration",
      description: "Discover new career possibilities you may not have considered before.",
      details: "Explore adjacent and alternative career paths that match your existing skillset, helping you discover exciting opportunities outside your current field."
    }
  ];

  return (
    <section className="py-20 bg-gray-50" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Unlock Your Career Potential</h2>
          <p className="text-lg text-gray-600">
            FutureScope.AI combines cutting-edge artificial intelligence with career development expertise to guide you toward professional success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary/80 group cursor-pointer ${
                expandedFeature === index ? 'scale-105 shadow-xl z-10' : ''
              }`}
              onClick={() => setExpandedFeature(expandedFeature === index ? null : index)}
              onMouseEnter={() => setExpandedFeature(index)}
              onMouseLeave={() => setExpandedFeature(null)}
            >
              <CardHeader className="pb-2">
                <div className="mb-2 transform group-hover:scale-110 transition-transform duration-200">{feature.icon}</div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {expandedFeature === index ? feature.details : feature.description}
                </CardDescription>
                {expandedFeature === index && (
                  <div className="mt-4 text-xs text-primary font-medium animate-fadeIn">
                    Click to collapse
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
