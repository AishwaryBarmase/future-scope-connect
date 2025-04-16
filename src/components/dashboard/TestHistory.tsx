
import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TestHistoryProps {
  testHistory: any[];
}

const TestHistory: React.FC<TestHistoryProps> = ({ testHistory }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Test History</h2>
      {testHistory.length === 0 ? (
        <p className="text-gray-600">
          You haven't taken any tests yet. 
          <Link to="/#get-started" className="text-primary hover:underline ml-1">
            Start your career assessment
          </Link>
        </p>
      ) : (
        testHistory.map((test) => (
          <Card key={test.id} className="mb-4">
            <CardHeader>
              <CardTitle>{test.test_type} Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Taken on: {new Date(test.created_at).toLocaleString()}
                </p>
                <Button variant="outline" size="sm">
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
