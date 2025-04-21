
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import PsychometricTestsSection from '@/components/PsychometricTestsSection';
import OnboardingModal from '@/components/OnboardingModal';
import { useAuth } from '@/context/AuthContext';
import CareerExplorer from '@/components/CareerExplorer';
import QuizSection from '@/components/QuizSection';

const Index = () => {
  const { user, profile, loading } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Check if we should redirect to quiz after login
  useEffect(() => {
    const redirectToQuiz = sessionStorage.getItem('redirectToQuiz');
    if (redirectToQuiz === 'true' && user) {
      sessionStorage.removeItem('redirectToQuiz');
      navigate('/quiz-selection');
    }
  }, [user, navigate]);

  // Show onboarding modal for new users
  useEffect(() => {
    if (user && profile && !loading) {
      if (!profile.onboarding_completed) {
        setShowOnboarding(true);
      }
    }
  }, [user, profile, loading]);

  // Handler for the "Find your Path" button
  const handleFindYourPathClick = () => {
    if (user) {
      navigate('/quiz-selection');
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-purple-50">
      <Header />
      <main className="flex-grow">
        <>
          <HeroSection />
          <div className="py-20 bg-white bg-opacity-70 backdrop-blur-sm" id="get-started">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16 animate-fadeIn">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Ready to Discover Your Future?</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Take our personalized career assessment to find the perfect path for your skills and interests
                </p>

                {user ? (
                  <Button 
                    className="text-lg px-6 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transform hover:scale-105 transition-all duration-300" 
                    size="lg" 
                    onClick={handleFindYourPathClick}
                  >
                    Find Your Path
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <Button 
                      className="text-lg px-6 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transform hover:scale-105 transition-all duration-300" 
                      size="lg" 
                      onClick={handleFindYourPathClick}
                    >
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
          
          {/* Use our new Quiz Section instead of AI Recommendation */}
          <QuizSection />
          
          {/* Add Psychometric Tests Section */}
          <PsychometricTestsSection />
          
          {/* Add Career Explorer Section with id for direct navigation */}
          <div id="careers">
            <CareerExplorer />
          </div>
          
          <div ref={featuresRef} id="features">
            <StatsSection />
            <CallToAction />
          </div>
        </>
      </main>
      <Footer />
      
      {/* Login Prompt Dialog */}
      <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign in to continue</DialogTitle>
            <DialogDescription>
              You need to be signed in to take the career assessment quiz.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 mt-4">
            <Button onClick={handleSignInClick} className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              Sign In
            </Button>
            <Button variant="outline" onClick={handleSignUpClick} className="hover:bg-gray-50">
              Create Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Onboarding Modal for new users */}
      <OnboardingModal 
        open={showOnboarding} 
        onOpenChange={setShowOnboarding} 
      />
    </div>
  );
};

export default Index;
