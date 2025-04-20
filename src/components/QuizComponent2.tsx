
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { quizQuestions2 } from '../data/quizQuestions2';
import { convertResponsesToVector, getCareerMatches } from '../utils/careerVectorUtils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from '../hooks/use-toast';

const QuizComponent2 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const currentQuestion = quizQuestions2[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions2.length) * 100;

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setUserResponses(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNext = async () => {
    if (!userResponses[currentQuestion.id]) {
      toast({
        title: "Please select an option",
        description: "You must select an answer before proceeding.",
        variant: "destructive"
      });
      return;
    }

    if (currentQuestionIndex === quizQuestions2.length - 1) {
      await handleSubmit();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const userVector = convertResponsesToVector(userResponses);
      const matches = await getCareerMatches(userVector);
      
      navigate('/results', { 
        state: { 
          careerMatches: matches,
          responses: userResponses 
        } 
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your answers. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuit = () => {
    if (Object.keys(userResponses).length > 0) {
      setShowQuitDialog(true);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={handleQuit}>
          Cancel
        </Button>
        <span className="text-sm font-medium">
          Question {currentQuestionIndex + 1} of {quizQuestions2.length}
        </span>
      </div>

      <Progress value={progress} className="w-full" />

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {currentQuestion.category}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg">{currentQuestion.text}</p>

          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <div
                key={option.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  userResponses[currentQuestion.id] === option.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleOptionSelect(currentQuestion.id, option.id)}
              >
                <p className="text-sm">{option.text}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleNext}
              disabled={isSubmitting}
            >
              {currentQuestionIndex === quizQuestions2.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showQuitDialog} onOpenChange={setShowQuitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to quit?</DialogTitle>
            <DialogDescription>
              Your progress will be lost if you leave now.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowQuitDialog(false)}>
              Continue Quiz
            </Button>
            <Button
              variant="destructive"
              onClick={() => navigate('/')}
            >
              Quit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuizComponent2;
