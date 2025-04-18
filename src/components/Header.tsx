import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X, Settings, User as UserIcon, LogOut, Home, LayoutDashboard, Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    } else {
      // If not on homepage, navigate to homepage with hash
      navigate(`/#${sectionId}`);
    }
  };

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
                <li>
                  <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
                    <Home className="inline-block mr-1 h-4 w-4" /> Home
                  </Link>
                </li>
                {user && (
                  <li>
                    <Link to="/dashboard" className="text-gray-700 hover:text-primary transition-colors">
                      <LayoutDashboard className="inline-block mr-1 h-4 w-4" /> Dashboard
                    </Link>
                  </li>
                )}
                <li><a onClick={() => handleNavigation('features')} className="text-gray-700 hover:text-primary transition-colors cursor-pointer">Features</a></li>
                <li><a onClick={() => handleNavigation('about')} className="text-gray-700 hover:text-primary transition-colors cursor-pointer">About</a></li>
                <li>
                  <Link to="/careers" className="text-gray-700 hover:text-primary transition-colors">
                    <Briefcase className="inline-block mr-1 h-4 w-4" /> Careers
                  </Link>
                </li>
              </ul>
            </nav>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Avatar>
                      <AvatarImage src={profile?.avatar_url} />
                      <AvatarFallback>{getInitials(profile?.full_name)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{profile?.full_name || user.email}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white" align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile/edit" className="flex items-center cursor-pointer">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Edit Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="flex items-center cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="mr-2">Sign In</Button>
                </Link>
                <Link to="/login" state={{ initialTab: 'signup' }}>
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="mr-4">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback>{getInitials(profile?.full_name)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white" align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile/edit" className="flex items-center cursor-pointer">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Edit Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="flex items-center cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
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
                <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-700 hover:text-primary transition-colors">Home</Link></li>
                {user && (
                  <li>
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block text-gray-700 hover:text-primary transition-colors">Dashboard</Link>
                  </li>
                )}
                <li><a onClick={() => handleNavigation('features')} className="block text-gray-700 hover:text-primary transition-colors cursor-pointer">Features</a></li>
                <li><a onClick={() => handleNavigation('about')} className="block text-gray-700 hover:text-primary transition-colors cursor-pointer">About</a></li>
                <li>
                  <Link 
                    to="/careers" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="block text-gray-700 hover:text-primary transition-colors"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </nav>
            {!user && (
              <div className="mt-4 flex flex-col space-y-2">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link to="/login" state={{ initialTab: 'signup' }} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
