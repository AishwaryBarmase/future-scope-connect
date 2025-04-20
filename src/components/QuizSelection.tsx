
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, LineChart } from 'lucide-react';

const QuizSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Choose Your Assessment</h2>
      <p className="text-lg text-center text-gray-600 mb-10">
        Select one of our specialized assessments to discover insights about your career path
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
              <LineChart className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>Career Matching Quiz</CardTitle>
            <CardDescription>Find your ideal career path based on your interests, skills, and work preferences</CardDescription>
          </CardHeader>
          <CardContent className="text-center text-sm text-gray-600">
            <p>15 questions • 15 minutes</p>
            <p className="mt-2">Analyzes your preferences across multiple dimensions and matches you with potential career paths</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => navigate('/career-quiz')}>
              Start Career Quiz
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <div className="mx-auto bg-accent/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
              <BookOpen className="h-8 w-8 text-accent" />
            </div>
            <CardTitle>Aptitude Assessment</CardTitle>
            <CardDescription>Discover your natural abilities across different cognitive domains</CardDescription>
          </CardHeader>
          <CardContent className="text-center text-sm text-gray-600">
            <p>15 questions • 15 minutes</p>
            <p className="mt-2">Tests your skills in logical reasoning, numerical ability, memory, and more</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline" onClick={() => navigate('/quiz')}>
              Start Aptitude Quiz
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default QuizSelection;
