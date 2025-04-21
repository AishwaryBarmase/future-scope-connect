
import React, { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, AlertTriangle } from "lucide-react";
import { quizQuestions } from '../data/quizQuestions';

// Using interface for better type safety
interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  category: string;
  text: string;
  options: Option[];
}

// Group questions by category
const groupedQuestions = quizQuestions.reduce((acc, question) => {
  if (!acc[question.category]) {
    acc[question.category] = [];
  }
  acc[question.category].push(question);
  return acc;
}, {} as Record<string, Question[]>);

// Extract categories in order
const categories = Object.keys(groupedQuestions);

// Category colors
const categoryColors: Record<string, string> = {
  'IQ': 'bg-blue-500',
  'Personality': 'bg-purple-500',
  'Numerical Ability': 'bg-green-500',
  'Memory': 'bg-amber-500',
  'Career Interests': 'bg-pink-500',
  'Mechanical Reasoning': 'bg-orange-500',
  'Abstract Reasoning': 'bg-indigo-500',
  'EQ': 'bg-rose-500'
};

interface QuizComponentProps {
  onQuizComplete?: (responses: Record<string, string>) => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'error' | 'success' | 'info' } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(17.5 * 60); // 17.5 minutes in seconds
  const [confirmQuit, setConfirmQuit] = useState(false);
  const [sectionTimer, setSectionTimer] = useState(2.5 * 60); // 2.5 minutes per section
  const [currentSection, setCurrentSection] = useState(categories[0]);
  const navigate = useNavigate();

  const currentQuestion = quizQuestions[currentQuestionIndex];
  
  // Timer effect
  useEffect(() => {
    if (!isComplete) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleQuizTimeout();
            return 0;
          }
          return prev - 1;
        });
        
        setSectionTimer(prev => {
          if (prev <= 1) {
            // Move to next section
            const currentSectionIndex = categories.indexOf(currentSection);
            if (currentSectionIndex < categories.length - 1) {
              setCurrentSection(categories[currentSectionIndex + 1]);
              
              // Find the first question of the next section
              const nextSectionQuestions = groupedQuestions[categories[currentSectionIndex + 1]];
              if (nextSectionQuestions && nextSectionQuestions.length > 0) {
                const nextQuestionIndex = quizQuestions.findIndex(q => q.id === nextSectionQuestions[0].id);
                if (nextQuestionIndex !== -1) {
                  setCurrentQuestionIndex(nextQuestionIndex);
                }
              }
              
              return 2.5 * 60; // Reset section timer
            }
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isComplete, currentSection, categories]);
  
  // Effect to track section changes
  useEffect(() => {
    if (currentQuestion) {
      const newSection = currentQuestion.category;
      if (newSection !== currentSection) {
        setCurrentSection(newSection);
        setSectionTimer(2.5 * 60); // Reset section timer when category changes
      }
    }
  }, [currentQuestion, currentSection]);
  
  // Format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  // Handle quiz timeout
  const handleQuizTimeout = () => {
    setIsSubmitting(true);
    setStatusMessage({ text: 'Time\'s up! Submitting your responses...', type: 'info' });
    
    submitQuizResponses();
  };
  
  // Handler for "Home" navigation
  const handleHomeClick = () => {
    if (currentQuestionIndex > 0 && !isComplete) {
      setConfirmQuit(true);
    } else {
      navigate('/');
    }
  };
  
  // Handler for selecting an option
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserResponses(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
    setStatusMessage(null);
  };
  
  // Handler for the Next/Submit button
  const handleNextClick = async () => {
    // Check if an option was selected for the current question
    if (!userResponses[currentQuestion.id]) {
      setStatusMessage({ text: 'Please select an option.', type: 'error' });
      return;
    }
    
    setStatusMessage(null);
    
    // If it's the last question, submit
    if (currentQuestionIndex === quizQuestions.length - 1) {
      setIsSubmitting(true);
      setStatusMessage({ text: 'Submitting your responses...', type: 'info' });
      await submitQuizResponses();
    } else {
      // Move to the next question
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };
  
  // Submit quiz responses
  const submitQuizResponses = async () => {
    try {
      // Store test in history if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        try {
          const { error } = await supabase
            .from('test_history')
            .insert({
              user_id: user.id,
              responses: userResponses,
              test_type: 'aptitude',
              score: {} // Will be populated later
            });
          
          if (error) console.error("Error saving test history:", error);
        } catch (err) {
          console.error("Error in test history save:", err);
        }
      }
      
      setStatusMessage({ text: 'Quiz submitted successfully!', type: 'success' });
      setIsComplete(true);
      setIsSubmitting(false);
      
      if (onQuizComplete) {
        onQuizComplete(userResponses);
      } else {
        // Navigate to results if no callback is provided
        navigate('/results', { state: { responses: userResponses, quizType: 'aptitude' } });
      }
    } catch (error: any) {
      console.error("Error submitting quiz:", error);
      setStatusMessage({
        text: `Submission Error: ${error.message || 'Please try again.'}`,
        type: 'error'
      });
      setIsSubmitting(false);
    }
  };
  
  // Restart quiz
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserResponses({});
    setIsComplete(false);
    setTimeRemaining(17.5 * 60);
    setSectionTimer(2.5 * 60);
    setCurrentSection(categories[0]);
    setStatusMessage(null);
  };

  // View results
  const handleViewResults = () => {
    navigate('/results', { state: { responses: userResponses, quizType: 'aptitude' } });
  };
  
  // Return to home
  const handleReturnHome = () => {
    navigate('/', { replace: true });
  };
  
  // Render final message if complete
  if (isComplete) {
    return (
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-primary">Thank You!</h2>
        <p className={`font-semibold ${statusMessage?.type === 'success' ? 'text-green-600' : 'text-gray-700'}`}>
          {statusMessage?.text || "Your responses have been recorded."}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={handleReturnHome} variant="outline">
            Return to Home
          </Button>
          <Button onClick={handleRestartQuiz} variant="outline">
            Take Quiz Again
          </Button>
          <Button onClick={handleViewResults}>
            View Results
          </Button>
        </div>
      </div>
    );
  }

  // Render the quiz question
  return (
    <>
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto">
        {/* Timer and Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={handleHomeClick}
            className="text-gray-600 hover:text-primary transition-colors"
          >
            Home
          </button>
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-primary" />
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium">Total: {formatTime(timeRemaining)}</span>
              <span className="text-xs text-gray-500">Section: {formatTime(sectionTimer)}</span>
            </div>
          </div>
        </div>
        
        {/* Section indicator */}
        <div className="mb-4">
          <div className={`inline-block py-1 px-3 rounded-full text-white text-sm ${categoryColors[currentQuestion.category] || 'bg-gray-500'}`}>
            {currentQuestion.category}
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="mb-4 text-sm text-gray-600">
          Question {currentQuestionIndex + 1} of {quizQuestions.length}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 dark:bg-gray-700">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}>
          </div>
        </div>

        {/* Question Text */}
        <p className="text-lg md:text-xl font-semibold mb-6 text-gray-800">
          {currentQuestion.text}
        </p>

        {/* Options */}
        <div className="space-y-4 mb-8">
          {currentQuestion.options.map((option) => (
            <label
              key={option.id}
              htmlFor={`${currentQuestion.id}-${option.id}`}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 ease-in-out ${
                userResponses[currentQuestion.id] === option.id
                  ? 'border-primary bg-primary/10 ring-2 ring-primary' // Style for selected
                  : 'border-border hover:bg-muted/50' // Style for unselected
              }`}
            >
              <input
                type="radio"
                id={`${currentQuestion.id}-${option.id}`}
                name={`question-${currentQuestion.id}`}
                value={option.id}
                checked={userResponses[currentQuestion.id] === option.id}
                onChange={handleOptionChange}
                className="form-radio h-5 w-5 text-primary focus:ring-primary border-gray-300 mr-3"
              />
              <span className="text-gray-700">{option.text}</span>
            </label>
          ))}
        </div>

        {/* Status Message */}
        {statusMessage && (
          <p className={`mb-4 text-sm font-medium ${
              statusMessage.type === 'error' ? 'text-red-600' :
              statusMessage.type === 'success' ? 'text-green-600' : 'text-gray-600'
            }`}
          >
            {statusMessage.text}
          </p>
        )}

        {/* Next/Submit Button */}
        <button
          onClick={handleNextClick}
          disabled={isSubmitting}
          className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ease-in-out"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Submitting...</span>
           ) : currentQuestionIndex === quizQuestions.length - 1 ? (
            'Submit Answers'
           ) : (
             'Next Question'
           )
          }
        </button>
      </div>
      
      {/* Confirmation Dialog */}
      <Dialog open={confirmQuit} onOpenChange={setConfirmQuit}>
        <DialogContent>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Are you sure?
          </DialogTitle>
          <DialogDescription>
            You are about to quit the quiz. Your progress will be lost and you'll need to start again.
          </DialogDescription>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setConfirmQuit(false)}>
              No, continue quiz
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                setConfirmQuit(false);
                navigate('/', { replace: true });
              }}
            >
              Yes, quit quiz
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuizComponent;
