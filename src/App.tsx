// src/pages/Index.tsx (or your main authenticated page component)

import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Adjust path if needed
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { Button } from "@/components/ui/button"; // Example: Import button from your UI lib
import QuizComponent from '../components/QuizComponent'; // Adjust path if needed
// Import other components used in your Index page (header, footer, etc.)
// import Header from '../components/Header';
// import Footer from '../components/Footer';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResponses, setQuizResponses] = useState<Record<string, string> | null>(null);

  // Check user authentication status on load and listen for changes
  useEffect(() => {
    const getSession = async () => {
        setLoading(true); // Start loading
        try {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
        } catch (error) {
            console.error("Error getting session:", error);
            setUser(null);
        } finally {
            setLoading(false); // Finish loading
        }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null);
        setLoading(false); // Update loading state on change
        // If user logs out, ensure quiz is hidden
        if (_event === 'SIGNED_OUT') {
            setShowQuiz(false);
            setQuizResponses(null);
        }
      }
    );

    // Cleanup listener on component unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Handler for the "Find your Path" button
  const handleFindYourPathClick = () => {
    if (user) {
      console.log("Starting quiz for user:", user.id);
      setShowQuiz(true); // Show the quiz component
      setQuizResponses(null); // Reset previous responses if any
    } else {
      // This case might not be reachable if button is disabled, but good practice
      console.log("User not logged in. Cannot start quiz.");
      // Optionally redirect to login or show message
      alert("Please sign in to find your path.");
    }
  };

  // Handler called by QuizComponent upon completion
  const handleQuizCompletion = (responses: Record<string, string>) => {
    console.log("Quiz completed in Index page. Responses:", responses);
    setQuizResponses(responses);
    // Optionally hide the quiz component again:
    // setShowQuiz(false);

    // --- !!! Trigger Career Suggestion Logic Here !!! ---
    // Send 'responses' or user ID to your backend/edge function
    // to get career suggestions and display them.
    console.log("Next Step: Implement logic to fetch and display career suggestions based on responses.");
  };

  // Display loading indicator
  if (loading) {
    // Use a spinner or skeleton loader from your UI library if available
    return (
        <div className="flex justify-center items-center min-h-screen">
            <p>Loading user session...</p>
        </div>
    );
  }

  // Main page content
  return (
    <div className="flex flex-col min-h-screen">
      {/* Optional: Add your site Header here */}
      {/* <Header user={user} /> */}
      <p className="text-center my-4">User: {user ? user.email : 'Not Signed In'}</p>

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* --- Conditional Rendering: Show Button or Quiz --- */}

        {!showQuiz ? (
          // --- Show content when quiz is NOT active ---
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Welcome to FutureScope.AI!</h2>
            <p className="text-muted-foreground mb-8">
              {user ? `Ready to discover your future career, ${user.email}?` : 'Sign in and discover your ideal career path.'}
            </p>

            <Button
              onClick={handleFindYourPathClick}
              disabled={!user} // Disable button if user is not logged in
              size="lg" // Example size prop
            >
              Find your Path
            </Button>
            {!user && (
                <p className="text-xs text-destructive mt-2">
                    Please <a href="/login" className="underline">sign in</a> first to start the quiz.
                </p>
            )}
          </div>
        ) : !quizResponses ? (
          // --- Show Quiz when active and not yet completed ---
          <div className="flex justify-center">
             <QuizComponent
                onQuizComplete={handleQuizCompletion}
                // Pass user ID if QuizComponent needs it directly,
                // otherwise Supabase Edge Functions can get it from the session
                // userId={user?.id}
            />
          </div>
        ) : (
           // --- Show content AFTER quiz completion ---
           <div className="text-center p-6 bg-card text-card-foreground rounded-lg shadow-md max-w-2xl mx-auto">
                 <h3 className="text-xl font-semibold mb-4">Quiz Completed!</h3>
                 <p>Your responses have been saved. We are now analyzing your profile.</p>
                 <p className="mt-4 text-sm text-muted-foreground">(Career suggestion display logic to be implemented here)</p>
                 {/* Display career suggestions when fetched */}
            </div>
        )}

      </main>

      {/* Optional: Add your site Footer here */}
      {/* <Footer /> */}
    </div>
  );
};

export default Index;
