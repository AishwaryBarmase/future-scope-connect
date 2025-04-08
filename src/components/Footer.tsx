
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold gradient-text">FutureScope.AI</h3>
            <p className="text-sm text-gray-600">
              Helping you find your perfect career path through AI-powered guidance and assessment.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/AishwaryBarmase/future-scope-connect/tree/main?tab=readme-ov-file" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link></li>
              <li><a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a></li>
              <li><Link to="/login" className="text-gray-600 hover:text-primary transition-colors">Sign In</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Career Guide</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Assessment Tips</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                <span>AI&DS Department, Pr. Pote Patil College of Engineering, Amravati</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <a href="mailto:asbarmaseai2022@prpotepatilengg.ac.in" className="hover:text-primary transition-colors">
                  asbarmaseai2022@prpotepatilengg.ac.in
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <a href="tel:+919172683154" className="hover:text-primary transition-colors">
                  +91 91726 83154
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} FutureScope.AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
