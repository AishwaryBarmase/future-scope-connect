// src/components/QuizComponent.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client'; // Correct import path

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

const quizData: Question[] = [
   // --- IQ ---
    {
        id: 'IQ01', category: 'IQ', text: 'Which number comes next in the sequence -1, 4, 9, 25, ?',
        options: [ { id: 'IQ01-1', text: '36' }, { id: 'IQ01-2', text: '49' }, { id: 'IQ01-3', text: '16' }, { id: 'IQ01-4', text: '81' } ]
    },
    {
        id: 'IQ02', category: 'IQ', text: 'Complete the pattern: AA, AB, AC, AD?',
        options: [ { id: 'IQ02-1', text: 'BA' }, { id: 'IQ02-2', text: 'AE' }, { id: 'IQ02-3', text: 'BB' }, { id: 'IQ02-4', text: 'CA' } ]
    },
     {
        id: 'IQ03', category: 'IQ', text: 'Which number should replace the question mark – 10, 14, 19, 25?',
        options: [ { id: 'IQ03-1', text: '32' }, { id: 'IQ03-2', text: '30' }, { id: 'IQ03-3', text: '31' }, { id: 'IQ03-4', text: '34' } ]
    },
     {
        id: 'IQ04', category: 'IQ', text: 'Which of the following is the odd one out – 3, 5, 7, 9, 11?',
        options: [ { id: 'IQ04-1', text: '3' }, { id: 'IQ04-2', text: '7' }, { id: 'IQ04-3', text: '9' }, { id: 'IQ04-4', text: '11' } ]
    },
    // --- Personality ---
    {
        id: 'PA01', category: 'Personality', text: 'How do you prefer to spend your free time?',
        options: [ { id: 'PA01-1', text: 'Reading' }, { id: 'PA01-2', text: 'Socializing' }, { id: 'PA01-3', text: 'Watching Movies' }, { id: 'PA01-4', text: 'Playing Sports' } ]
    },
    {
        id: 'PA02', category: 'Personality', text: 'When faced with a challenge, you tend to:',
        options: [ { id: 'PA02-1', text: 'Analyze the situation carefully' }, { id: 'PA02-2', text: 'Jump into action' }, { id: 'PA02-3', text: 'Seek advice from others' }, { id: 'PA02-4', text: 'Avoid the situation' } ]
    },
     // --- Numerical Ability ---
    {
        id: 'NA01', category: 'Numerical Ability', text: 'Mobile phone ₹25,000, 20% discount. Sale price?',
        options: [ { id: 'NA01-1', text: 'Rs20,000' }, { id: 'NA01-2', text: 'Rs18,000' }, { id: 'NA01-3', text: 'Rs22,500' }, { id: 'NA01-4', text: 'Rs23,000' } ]
    },
    {   // Using corrected Q4 data from previous step
        id: 'NA04', category: 'Numerical Ability', text: 'Factory: 1200 units/8 days. Units in 15 days?',
        options: [ { id: 'NA04-1', text: '2000 units' }, { id: 'NA04-2', text: '2250 units' }, { id: 'NA04-3', text: '2400 units' }, { id: 'NA04-4', text: '2600 units' } ]
    },
    // --- Mechanical Reasoning ---
     {
        id: 'MR01', category: 'Mechanical Reasoning', text: 'Gear A clockwise, touches Gear B. Gear B direction?',
        options: [ { id: 'MR01-1', text: 'Clockwise' }, { id: 'MR01-2', text: 'Counter-clockwise' }, { id: 'MR01-3', text: 'Both' }, { id: 'MR01-4', text: 'It doesnt turn' } ]
    },
    {   // Using Q2 only as Q3 was duplicate
        id: 'MR02', category: 'Mechanical Reasoning', text: 'Make lifting heavy object with lever easier?',
        options: [ { id: 'MR02-1', text: 'Placing the fulcrum closer to the object' }, { id: 'MR02-2', text: 'Placing the fulcrum closer to you' }, { id: 'MR02-3', text: 'Making the lever shorter' }, { id: 'MR02-4', text: 'Adding more weight to the object' } ]
    },
    // --- Abstract Reasoning ---
    {
        id: 'AR01', category: 'Abstract Reasoning', text: 'Which shape comes next: 🔺, 🔷, 🔺, 🔷, 🔺, ?',
        options: [ { id: 'AR01-1', text: '🔷' }, { id: 'AR01-2', text: '🔺' }, { id: 'AR01-3', text: '⬛' }, { id: 'AR01-4', text: '⭕' } ]
    },
    // --- EQ ---
    {
        id: 'EQ01', category: 'EQ', text: 'You receive negative feedback on a project you worked hard on. What’s the most emotionally intelligent first response?',
        options: [ { id: 'EQ01-1', text: 'Get defensive and explain why they’re wrong' }, { id: 'EQ01-2', text: 'Ignore the feedback' }, { id: 'EQ01-3', text: 'Listen calmly and ask questions to understand it better' }, { id: 'EQ01-4', text: 'Blame the situation or someone else' } ]
    },
    // --- Career Interests ---
    {
        id: 'CI01', category: 'Career Interests', text: 'How interested are you in studying mathematics?',
        options: [ { id: 'CI01-1', text: 'I love it; I solve math problems for fun' }, { id: 'CI01-2', text: 'I enjoy it and find it stimulating' }, { id: 'CI01-3', text: 'I am neutral;  I don’t mind it' }, { id: 'CI01-4', text: 'I find it challenging but manageable' } ]
    },
  // ... ADD ALL OTHER QUESTIONS HERE
];

interface QuizComponentProps {
  onQuizComplete: (responses: Record<string, string>) => void; // Callback when quiz finishes
  // Optional: Pass user ID if needed for saving
  // userId?: string;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'error' | 'success' | 'info' } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];

  // Handler for selecting an option
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserResponses(prev => ({
      ...prev,
      [currentQuestion.id]: value // Store option.id as the value
    }));
    setStatusMessage(null); // Clear status message on new selection
  };

  // Handler for the Next/Submit button
  const handleNextClick = async () => {
    // Check if an option was selected for the current question
    if (!userResponses[currentQuestion.id]) {
      setStatusMessage({ text: 'Please select an option.', type: 'error' });
      return;
    }

    setStatusMessage(null); // Clear error

    // If it's the last question, submit
    if (currentQuestionIndex === quizData.length - 1) {
      setIsSubmitting(true);
      setStatusMessage({ text: 'Submitting your responses...', type: 'info' });

      try {
        const { error } = await supabase
          .from('quiz_responses') // Ensure this table name matches your Supabase setup
          .insert([{ responses: userResponses /*, user_id: userId */ }]) // Add user_id if needed

        if (error) throw error;

        setStatusMessage({ text: 'Quiz submitted successfully!', type: 'success' });
        setIsComplete(true); // Mark quiz as complete
        setIsSubmitting(false);
        onQuizComplete(userResponses); // Notify parent component

      } catch (error: any) {
        console.error("Error submitting quiz:", error);
        setStatusMessage({ text: `Submission Error: ${error.message || 'Please try again.'}`, type: 'error' });
        setIsSubmitting(false);
      }
    } else {
      // Move to the next question
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  // Render final message if complete
  if (isComplete) {
    return (
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-primary">Thank You!</h2>
        <p className={`font-semibold ${statusMessage?.type === 'success' ? 'text-green-600' : 'text-gray-700'}`}>
          {statusMessage?.text || "Your responses have been recorded."}
        </p>
        {/* Add a button here to navigate to results or dashboard if needed */}
      </div>
    );
  }

  // Render the quiz question
  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      {/* Progress indicator (optional) */}
       <div className="mb-4 text-sm text-gray-600">
         Question {currentQuestionIndex + 1} of {quizData.length} ({currentQuestion.category})
       </div>
       <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 dark:bg-gray-700">
         <div
             className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-out"
             style={{ width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%` }}>
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
              value={option.id} // Store option.id
              checked={userResponses[currentQuestion.id] === option.id}
              onChange={handleOptionChange}
              className="form-radio h-5 w-5 text-primary focus:ring-primary border-gray-300 mr-3" // Tailwind standard radio classes might need form plugin
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
         ) : currentQuestionIndex === quizData.length - 1 ? (
          'Submit Answers'
         ) : (
           'Next Question'
         )
        }
      </button>
    </div>
  );
};

export default QuizComponent;
