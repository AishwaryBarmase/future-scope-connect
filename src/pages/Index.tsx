
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import QuizComponent from '@/components/QuizComponent';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { user, profile, loading } = useAuth();
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResponses, setQuizResponses] = useState<Record<string, string> | null>(null);

  // Handler for the "Find your Path" button
  const handleFindYourPathClick = () => {
    if (user) {
      console.log("Starting quiz for user:", user.id);
      setShowQuiz(true); // Show the quiz component
      setQuizResponses(null); // Reset previous responses if any
    }
  };

  // Handler called by QuizComponent upon completion
  const handleQuizCompletion = (responses: Record<string, string>) => {
    console.log("Quiz completed. Responses:", responses);
    setQuizResponses(responses);
    // Hide the quiz component again
    setShowQuiz(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {user && showQuiz ? (
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-3xl mx-auto">
              <QuizComponent onQuizComplete={handleQuizCompletion} />
            </div>
          </div>
        ) : user && quizResponses ? (
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-3xl mx-auto text-center p-6 bg-card text-card-foreground rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Quiz Completed!</h3>
              <p>Your responses have been saved. We are now analyzing your profile.</p>
              <p className="mt-4 text-sm text-muted-foreground">(Career suggestion display logic to be implemented)</p>
            </div>
          </div>
        ) : (
          <>
            <HeroSection />
            <FeaturesSection />
            <div className="py-20 bg-white" id="get-started">
              <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Discover Your Future?</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Take our personalized career assessment to find the perfect path for your skills and interests
                  </p>

                  {user ? (
                    <Button 
                      className="text-lg px-6 py-6" 
                      size="lg" 
                      onClick={handleFindYourPathClick}
                    >
                      Find Your Path
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <Link to="/login">
                        <Button className="text-lg px-6 py-6" size="lg">
                          Sign In to Begin
                        </Button>
                      </Link>
                      <p className="text-sm text-gray-500">
                        Don't have an account? <Link to="/login" className="text-primary hover:underline">Sign up</Link>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <StatsSection />
            <TestimonialsSection />
            <CallToAction />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
