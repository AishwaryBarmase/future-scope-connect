import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import QuizComponent from '@/components/QuizComponent';
import PsychometricTestsSection from '@/components/PsychometricTestsSection';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { user, profile, loading } = useAuth();
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResponses, setQuizResponses] = useState<Record<string, string> | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we should redirect to quiz after login
  useEffect(() => {
    const redirectToQuiz = sessionStorage.getItem('redirectToQuiz');
    if (redirectToQuiz === 'true' && user) {
      sessionStorage.removeItem('redirectToQuiz');
      setShowQuiz(true);
    }
  }, [user]);

  // Handler for the "Find your Path" button
  const handleFindYourPathClick = () => {
    if (user) {
      console.log("Starting quiz for user:", user.id);
      setShowQuiz(true);
      setQuizResponses(null);
    } else {
      setShowLoginPrompt(true);
      // Store intention to take quiz after login
      sessionStorage.setItem('redirectToQuiz', 'true');
    }
  };

  // Handler for "Learn More" button
  const handleLearnMoreClick = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler for sign-in button in prompt
  const handleSignInClick = () => {
    setShowLoginPrompt(false);
    navigate('/login');
  };

  // Handler for get started (sign up) in prompt
  const handleSignUpClick = () => {
    setShowLoginPrompt(false);
    navigate('/login', { state: { initialTab: 'signup' } });
  };

  // Handler called by QuizComponent upon completion
  const handleQuizCompletion = (responses: Record<string, string>) => {
    console.log("Quiz completed. Responses:", responses);
    setQuizResponses(responses);
    setShowQuiz(false);
  };
  
  // Handler for restarting the quiz
  const handleRestartQuiz = () => {
    setShowQuiz(true);
    setQuizResponses(null);
  };

  // Handler for returning to home page
  const handleReturnHome = () => {
    setShowQuiz(false);
    setQuizResponses(null);
    // Reload the page to ensure fresh state
    window.location.href = '/';
  };

  // Handler for viewing results
  const handleViewResults = () => {
    navigate('/results', { state: { responses: quizResponses } });
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
              <p className="mb-6">Your responses have been saved. We can now provide personalized career recommendations.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" onClick={handleReturnHome}>
                  Return to Home
                </Button>
                <Button variant="outline" onClick={handleRestartQuiz}>
                  Take Quiz Again
                </Button>
                <Button onClick={handleViewResults}>
                  View Results
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <HeroSection />
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
                      <Button className="text-lg px-6 py-6" size="lg" onClick={handleFindYourPathClick}>
                        Find Your Path
                      </Button>
                      <p className="text-sm text-gray-500">
                        Don't have an account? <Link to="/login" state={{ initialTab: 'signup' }} className="text-primary hover:underline">Sign up</Link>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Add Psychometric Tests Section */}
            <PsychometricTestsSection />
            
            <div ref={featuresRef} id="features">
              <StatsSection />
              <TestimonialsSection />
              <CallToAction />
            </div>
          </>
        )}
      </main>
      <Footer />
      
      {/* Login Prompt Dialog */}
      <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in to continue</DialogTitle>
            <DialogDescription>
              You need to be signed in to take the career assessment quiz.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <Button onClick={handleSignInClick}>
              Sign In
            </Button>
            <Button variant="outline" onClick={handleSignUpClick}>
              Create Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
