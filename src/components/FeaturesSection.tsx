
import { 
  Brain, 
  LineChart, 
  FileText, 
  MessageSquare,
  Briefcase, 
  Award, 
  TrendingUp,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "AI Career Matching",
      description: "Our advanced algorithms analyze your profile and preferences to suggest ideal career paths."
    },
    {
      icon: <LineChart className="h-8 w-8 text-primary" />,
      title: "Skills Gap Analysis",
      description: "Identify missing skills needed for your desired career and get personalized learning recommendations."
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Resume Assistant",
      description: "AI-powered tools to craft the perfect resume tailored to your target roles."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "AI Career Coach",
      description: "Get personalized advice and answers to your career questions from our AI coach."
    },
    {
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      title: "Job Matching",
      description: "Discover job opportunities that match your profile with personalized recommendations."
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Skill Certifications",
      description: "Earn certificates for completed skill assessments to enhance your professional profile."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Growth Tracking",
      description: "Monitor your progress towards career goals with interactive dashboards."
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Learning Scheduler",
      description: "Plan your skill development with personalized learning schedules."
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
            <Card key={index} className="hover:shadow-lg transition-shadow border-t-4 border-t-primary/80">
              <CardHeader className="pb-2">
                <div className="mb-2">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
