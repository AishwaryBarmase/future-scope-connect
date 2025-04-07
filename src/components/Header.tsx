
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <h1 className="text-2xl font-bold gradient-text">FutureScope.AI</h1>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <nav>
              <ul className="flex space-x-8">
                <li><Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link></li>
                <li><a href="#features" className="text-gray-700 hover:text-primary transition-colors">Features</a></li>
                <li><a href="#about" className="text-gray-700 hover:text-primary transition-colors">About</a></li>
              </ul>
            </nav>
            <Link to="/login">
              <Button variant="outline" className="mr-2">Sign In</Button>
            </Link>
            <Button>Get Started</Button>
          </div>
          
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden py-4">
            <nav>
              <ul className="space-y-4">
                <li><Link to="/" className="block text-gray-700 hover:text-primary transition-colors">Home</Link></li>
                <li><a href="#features" className="block text-gray-700 hover:text-primary transition-colors">Features</a></li>
                <li><a href="#about" className="block text-gray-700 hover:text-primary transition-colors">About</a></li>
              </ul>
            </nav>
            <div className="mt-4 flex flex-col space-y-2">
              <Link to="/login">
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
