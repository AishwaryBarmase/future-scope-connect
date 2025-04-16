
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface PsychometricTest {
  name: string;
  description: string;
  link: string;
}

const PSYCHOMETRIC_TESTS: PsychometricTest[] = [
  {
    name: "Personality Test",
    description: "A free, 15-minute personality test measuring your personality across 4 dimensions and 23 facets, showing your 4-digit acronym within the '16 types' spectrum.",
    link: "https://www.truity.com/test/type-finder-personality-test-new"
  },
  {
    name: "Full Scale IQ Test",
    description: "Measure human cognitive ability across 3 domains: Short-Term Memory, Reasoning, and Verbal skills.",
    link: "https://openpsychometrics.org/tests/FSIQ/1.php"
  },
  {
    name: "Self Esteem Test",
    description: "A widely used measure of self-esteem for research purposes. Not a diagnostic aid for psychological issues.",
    link: "https://openpsychometrics.org/tests/RSE.php"
  },
  {
    name: "Vocabulary IQ Test",
    description: "An interactive vocabulary test that provides an IQ score, measuring verbal ability.",
    link: "https://openpsychometrics.org/tests/VIQT/1.php"
  },
  {
    name: "Brain Dominance Scale",
    description: "Explore whether you're left-brained or right-brained based on cognitive preferences.",
    link: "https://openpsychometrics.org/tests/OHBDS/1.php"
  },
  {
    name: "Holland Code (RIASEC) Test",
    description: "Discover career fields that match your interests and abilities using Holland's Theory of Career Choice.",
    link: "https://openpsychometrics.org/tests/RIASEC/1.php"
  },
  {
    name: "Enneagram of Personality Test",
    description: "Explore your personality type within the 9 personality types of the Enneagram model.",
    link: "https://openpsychometrics.org/tests/OEPS/1.php"
  }
];

const PsychometricTestsSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleTakeTest = (test: PsychometricTest) => {
    if (user) {
      // Open the test link in a new tab
      window.open(test.link, '_blank');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="py-20 bg-soft-purple">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Explore Your Potential
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover insights about yourself through our curated collection of psychometric tests.
            Understand your personality, cognitive abilities, and career interests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PSYCHOMETRIC_TESTS.map((test, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{test.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{test.description}</p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        onClick={() => handleTakeTest(test)} 
                        variant="outline" 
                        className="w-full"
                      >
                        Take Test
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {user ? "Click to start the test" : "Please log in to take the test"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PsychometricTestsSection;
