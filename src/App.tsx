
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import Settings from "./pages/Settings";
import Results from "./pages/Results";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./context/AuthContext";
import CareerDetail from "./pages/CareerDetail";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/results" element={<Results />} />
          <Route path="/career/:categoryTitle/:careerTitle?" element={<CareerDetail />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
