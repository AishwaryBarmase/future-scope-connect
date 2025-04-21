
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BrainCog, Lightbulb } from 'lucide-react';

const QuizSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Take Our Career Assessment Quizzes</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover your strengths, preferences, and ideal career paths with our scientifically-designed assessments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="bg-primary h-2"></div>
            <CardContent className="p-6">
              <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <BrainCog className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Career Matching Quiz</h3>
              <p className="text-gray-600 mb-6">
                Find your ideal career path based on your interests, skills, and preferences. Takes approximately 15 minutes to complete.
              </p>
              <Button 
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                onClick={() => navigate('/career-quiz')}
              >
                Start Career Quiz
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="bg-accent h-2"></div>
            <CardContent className="p-6">
              <div className="bg-accent/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Lightbulb className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Aptitude Assessment</h3>
              <p className="text-gray-600 mb-6">
                Evaluate your skills across different domains including IQ, EQ, and specific aptitudes. Takes approximately 15 minutes to complete.
              </p>
              <Button 
                variant="outline"
                className="border-accent text-accent hover:bg-accent/10"
                onClick={() => navigate('/quiz')}
              >
                Start Aptitude Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
