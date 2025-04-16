import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Brain, User, UserCircle, BrainCircuit, LineChart, Stars, Disc } from "lucide-react";

interface PsychometricTest {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  link: string;
  icon: React.ElementType;
  color: string;
  category: 'personality' | 'intelligence' | 'other';
}

const PSYCHOMETRIC_TESTS: PsychometricTest[] = [
  {
    id: "personality",
    name: "Personality Test",
    description: "Discover your 4-digit personality type acronym",
    fullDescription: "A free, 15-minute personality test measuring your personality across 4 dimensions and 23 facets, showing your 4-digit acronym within the '16 types' spectrum.",
    link: "https://www.truity.com/test/type-finder-personality-test-new",
    icon: User,
    color: "bg-gradient-to-r from-violet-400 to-purple-500",
    category: 'personality'
  },
  {
    id: "enneagram",
    name: "Enneagram Test",
    description: "Explore the 9 personality types model",
    fullDescription: "Explore your personality type within the 9 personality types of the Enneagram model, revealing your core motivations and fears.",
    link: "https://openpsychometrics.org/tests/OEPS/",
    icon: Stars,
    color: "bg-gradient-to-r from-emerald-400 to-cyan-400",
    category: 'personality'
  },
  {
    id: "disc",
    name: "DISC Personality Test",
    description: "Measure Dominance, Influence, Steadiness & Conscientiousness",
    fullDescription: "The DISC assessment measures personality types across four dimensions: Dominance (D), Influence (i), Steadiness (S) and Conscientiousness (C), producing 12 total personality types.",
    link: "https://www.personality-quizzes.com/disc-test",
    icon: Disc,
    color: "bg-gradient-to-r from-amber-400 to-orange-500",
    category: 'personality'
  },
  {
    id: "bigfive",
    name: "Big Five Test",
    description: "Evaluate key personality traits on a sliding scale",
    fullDescription: "The OCEAN or Five Factor Model evaluates personality traits on a sliding scale across Openness, Conscientiousness, Extraversion, Agreeableness and Neuroticism.",
    link: "https://bigfive-test.com/test",
    icon: UserCircle,
    color: "bg-gradient-to-r from-blue-400 to-indigo-500",
    category: 'personality'
  },
  {
    id: "iq",
    name: "Full Scale IQ Test",
    description: "Measure cognitive abilities across 3 domains",
    fullDescription: "Measure human cognitive ability across 3 domains: Short-Term Memory, Reasoning, and Verbal skills to get a comprehensive IQ assessment.",
    link: "https://openpsychometrics.org/tests/FSIQ/1.php",
    icon: Brain,
    color: "bg-gradient-to-r from-rose-400 to-pink-500",
    category: 'intelligence'
  },
  {
    id: "vocabulary",
    name: "Vocabulary IQ Test",
    description: "Test your verbal ability and vocabulary range",
    fullDescription: "An interactive vocabulary test that provides an IQ score, measuring verbal ability and the breadth of your vocabulary knowledge.",
    link: "https://openpsychometrics.org/tests/VIQT/",
    icon: BrainCircuit,
    color: "bg-gradient-to-r from-yellow-400 to-amber-500",
    category: 'intelligence'
  },
  {
    id: "selfesteem",
    name: "Self Esteem Test",
    description: "Evaluate your self-perception and confidence",
    fullDescription: "A widely used measure of self-esteem for research purposes. Not a diagnostic aid for psychological issues, but offers insights into your self-perception.",
    link: "https://openpsychometrics.org/tests/RSE.php",
    icon: LineChart,
    color: "bg-gradient-to-r from-teal-400 to-green-500",
    category: 'other'
  },
  {
    id: "brain",
    name: "Brain Dominance Scale",
    description: "Discover if you're left or right-brained",
    fullDescription: "Explore whether you're left-brained or right-brained based on cognitive preferences and how you approach problems and creative tasks.",
    link: "https://openpsychometrics.org/tests/OHBDS/1.php",
    icon: Brain,
    color: "bg-gradient-to-r from-fuchsia-400 to-pink-500",
    category: 'other'
  },
  {
    id: "riasec",
    name: "Holland Code Test",
    description: "Find career fields that match your interests",
    fullDescription: "Discover career fields that match your interests and abilities using Holland's Theory of Career Choice (RIASEC) to guide your professional development.",
    link: "https://openpsychometrics.org/tests/RIASEC/1.php",
    icon: Stars,
    color: "bg-gradient-to-r from-sky-400 to-blue-500",
    category: 'other'
  }
];

const TestCard: React.FC<{ test: PsychometricTest; onTakeTest: () => void; }> = ({ test, onTakeTest }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Card 
      className={`h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden ${isExpanded ? 'ring-2 ring-primary' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className={`h-2 ${test.color}`}></div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-full ${test.color} text-white`}>
            <test.icon size={20} className="animate-pulse" />
          </div>
          <CardTitle className="text-lg">{test.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <HoverCard openDelay={100}>
          <HoverCardTrigger asChild>
            <p className="text-sm text-gray-600 mb-4 cursor-pointer">
              {isExpanded ? test.fullDescription : test.description}
              {!isExpanded && <span className="text-primary text-xs ml-1 italic">Hover for more</span>}
            </p>
          </HoverCardTrigger>
          <HoverCardContent side="top" align="start" className="w-80 p-4 z-50">
            <div className="space-y-2">
              <h4 className="font-medium">{test.name}</h4>
              <p className="text-sm text-gray-600">{test.fullDescription}</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </CardContent>
      <CardFooter>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  onTakeTest();
                }} 
                variant="outline" 
                className={`w-full hover:${test.color.replace('bg-', '')} hover:text-white transition-colors`}
              >
                Take Test
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to start the test</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

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

  // Group tests by category
  const personalityTests = PSYCHOMETRIC_TESTS.filter(test => test.category === 'personality');
  const intelligenceTests = PSYCHOMETRIC_TESTS.filter(test => test.category === 'intelligence');
  const otherTests = PSYCHOMETRIC_TESTS.filter(test => test.category === 'other');

  return (
    <section className="py-20 bg-gradient-to-b from-white via-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Explore Your Potential
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover insights about yourself through our curated collection of psychometric tests.
            Understand your personality, cognitive abilities, and career interests.
          </p>
        </div>

        <div className="space-y-12">
          {/* Personality Tests Row */}
          <div className="space-y-4 animate-fadeIn animate-delay-100">
            <h3 className="text-xl font-semibold text-gray-800 pl-2 border-l-4 border-primary">Personality Tests</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {personalityTests.map((test) => (
                <TestCard 
                  key={test.id} 
                  test={test} 
                  onTakeTest={() => handleTakeTest(test)} 
                />
              ))}
            </div>
          </div>

          {/* Intelligence Tests Row */}
          <div className="space-y-4 animate-fadeIn animate-delay-200">
            <h3 className="text-xl font-semibold text-gray-800 pl-2 border-l-4 border-secondary">Intelligence Tests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {intelligenceTests.map((test) => (
                <TestCard 
                  key={test.id} 
                  test={test} 
                  onTakeTest={() => handleTakeTest(test)} 
                />
              ))}
            </div>
          </div>

          {/* Other Tests Row */}
          <div className="space-y-4 animate-fadeIn animate-delay-300">
            <h3 className="text-xl font-semibold text-gray-800 pl-2 border-l-4 border-accent">Other Assessments</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherTests.map((test) => (
                <TestCard 
                  key={test.id} 
                  test={test} 
                  onTakeTest={() => handleTakeTest(test)} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PsychometricTestsSection;
