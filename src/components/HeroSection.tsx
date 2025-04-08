
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, LineChart, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleLearnMoreClick = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFindYourPathClick = () => {
    if (user) {
      // Directly scroll to the "get-started" section which will display the quiz
      const getStartedSection = document.getElementById('get-started');
      if (getStartedSection) {
        getStartedSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setShowLoginPrompt(true);
      // Store intention to take quiz after login
      sessionStorage.setItem('redirectToQuiz', 'true');
    }
  };

  const handleSignInClick = () => {
    setShowLoginPrompt(false);
    navigate('/login');
  };

  const handleSignUpClick = () => {
    setShowLoginPrompt(false);
    navigate('/login', { state: { initialTab: 'signup' } });
  };

  return (
    <section className="min-h-screen pt-24 hero-gradient">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Shape Your Future <br />
              <span className="gradient-text">With AI Guidance</span>
            </h1>
            <p className="text-lg text-gray-700 md:pr-10">
              Discover your perfect career path with our AI-powered guidance platform. 
              We analyze your skills, interests, and goals to provide personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="text-lg px-6 py-6" size="lg" onClick={handleFindYourPathClick}>
                Find Your Path <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="text-lg px-6 py-6" size="lg" onClick={handleLearnMoreClick}>
                Learn More
              </Button>
            </div>
            <div className="pt-6 text-sm text-gray-500">
              Join 10,000+ users who found their dream careers with FutureScope.AI
            </div>
          </div>

          <div className="relative animate-fadeIn animate-delay-200">
            <div className="glass-card p-6 md:p-8 rounded-2xl animate-float">
              <div className="absolute -top-3 -left-3 bg-primary text-white p-2 rounded-lg">
                <Brain size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">AI Career Matching</h3>
              <p className="text-gray-600 mb-6">Our advanced algorithms match your profile with thousands of career paths to find your perfect fit.</p>
              <div className="bg-gray-100 h-40 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <LineChart className="h-16 w-16 mx-auto text-primary opacity-60" />
                  <p className="text-sm text-gray-500 mt-2">Career path visualization</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Match score</span>
                <span className="text-sm font-medium">95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-primary h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            
            <div className="glass-card p-6 md:p-8 rounded-2xl absolute -bottom-10 -right-5 w-64 animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center mb-4">
                <div className="bg-accent/10 p-2 rounded-lg mr-3">
                  <Target size={20} className="text-accent" />
                </div>
                <h3 className="font-medium">Goal Tracking</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border-2 border-green-500 flex items-center justify-center mr-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm">Resume Updated</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border-2 border-green-500 flex items-center justify-center mr-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm">Skills Assessment</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border-2 border-accent mr-2"></div>
                  <span className="text-sm">Career Path Selection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </section>
  );
};

export default HeroSection;
