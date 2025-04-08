
import { useAuth } from "@/context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import QuizComponent from "@/components/QuizComponent";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const { user, loading, profile } = useAuth();
  
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
                <h2 className="text-xl font-semibold mb-4">Find Your Career Path</h2>
                <p className="text-gray-600 mb-4">
                  Take our comprehensive career assessment quiz to discover career paths that match your skills, interests, and personality.
                </p>
                <Link to="/quiz">
                  <Button>Start Career Quiz</Button>
                </Link>
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
