
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChartBar, FileText, UserRound } from 'lucide-react';

const AIRecommendationSection = () => {
  const navigate = useNavigate();
  
  const recommendations = [
    {
      title: "Personalized Career Path",
      description: "Get a tailored career roadmap based on your skills, interests, and personality.",
      icon: <ChartBar className="w-10 h-10 text-primary" />,
      action: () => navigate('/quiz')
    },
    {
      title: "Skill Gap Analysis",
      description: "Identify skills you need to develop to succeed in your chosen career.",
      icon: <FileText className="w-10 h-10 text-accent" />,
      action: () => navigate('/quiz')
    },
    {
      title: "Learning Resources",
      description: "Access curated courses, tutorials, and materials to build your skills.",
      icon: <BookOpen className="w-10 h-10 text-emerald-500" />,
      action: () => navigate('/#careers')
    },
    {
      title: "Mentorship Connection",
      description: "Connect with professionals in your field of interest for guidance.",
      icon: <UserRound className="w-10 h-10 text-violet-500" />,
      action: () => navigate('/dashboard')
    }
  ];

  return (
    <section className="py-20 bg-white bg-opacity-70 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">AI-Powered Career Guidance</h2>
          <p className="text-lg text-gray-600">
            Our intelligent system provides personalized recommendations to help you navigate your career journey with confidence
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {recommendations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-4 flex justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">{item.title}</h3>
                  <p className="text-gray-600 mb-6 text-center flex-grow">{item.description}</p>
                  <Button 
                    onClick={item.action}
                    className="w-full mt-auto bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIRecommendationSection;
