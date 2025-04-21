
import React, { useState, useEffect } from 'react';
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Navigate } from "react-router-dom";
import TestHistory from "@/components/dashboard/TestHistory";
import QuickLinks from "@/components/dashboard/QuickLinks";

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const [testHistory, setTestHistory] = useState<any[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    const fetchTestHistory = async () => {
      if (user) {
        setHistoryLoading(true);
        try {
          const { data, error } = await supabase
            .from('test_history')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (error) {
            console.error('Error fetching test history:', error);
            setTestHistory([]);
          } else {
            setTestHistory(data || []);
          }
        } catch (err) {
          console.error('Error in test history fetch:', err);
          setTestHistory([]);
        } finally {
          setHistoryLoading(false);
        }
      }
    };

    if (user) {
      fetchTestHistory();
    }
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
              <TestHistory testHistory={testHistory} isLoading={historyLoading} />
            </div>
            
            <div>
              <QuickLinks />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
