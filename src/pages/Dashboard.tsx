
import React, { useState, useEffect } from 'react';
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Navigate, Link } from "react-router-dom";

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const [testHistory, setTestHistory] = useState<any[]>([]);

  useEffect(() => {
    const fetchTestHistory = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('test_history')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (data) {
          setTestHistory(data);
        }
        if (error) {
          console.error('Error fetching test history:', error);
        }
      }
    };

    fetchTestHistory();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Welcome, {profile?.full_name || user.email}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
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
                  testHistory.map((test, index) => (
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
            </div>
            
            <div>
              <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                <ul className="space-y-2">
                  <li>
                    <Link to="/profile/edit" className="text-blue-600 hover:underline">
                      Edit Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="text-blue-600 hover:underline">
                      Account Settings
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
