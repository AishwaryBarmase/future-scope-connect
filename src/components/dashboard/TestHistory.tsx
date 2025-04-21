
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from 'date-fns';

interface TestHistoryProps {
  testHistory: any[];
  isLoading?: boolean;
}

const TestHistory: React.FC<TestHistoryProps> = ({ testHistory, isLoading = false }) => {
  const navigate = useNavigate();

  const handleViewDetails = (test: any) => {
    navigate('/results', { 
      state: { 
        responses: test.responses,
        quizType: test.test_type,
        fromHistory: true
      } 
    });
  };

  const formatTestType = (type: string) => {
    switch(type) {
      case 'aptitude':
        return 'Aptitude Assessment';
      case 'career-matching':
        return 'Career Matching Quiz';
      default:
        return type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Test History</h2>
        <p className="text-gray-600">Loading your test history...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Test History</h2>
      {testHistory.length === 0 ? (
        <p className="text-gray-600">
          You haven't taken any tests yet. 
          <Link to="/quiz-selection" className="text-primary hover:underline ml-1">
            Start your career assessment
          </Link>
        </p>
      ) : (
        testHistory.map((test) => (
          <Card key={test.id} className="mb-4">
            <CardHeader>
              <CardTitle>
                {formatTestType(test.test_type)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Taken {formatDistanceToNow(new Date(test.created_at), { addSuffix: true })}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewDetails(test)}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default TestHistory;
