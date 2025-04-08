
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X, Settings, User as UserIcon, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
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

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
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
                <li><Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link></li>
                <li><a href="#features" className="text-gray-700 hover:text-primary transition-colors">Features</a></li>
                <li><a href="#about" className="text-gray-700 hover:text-primary transition-colors">About</a></li>
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
                <Link to="/login">
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
                <li><Link to="/" className="block text-gray-700 hover:text-primary transition-colors">Home</Link></li>
                <li><a href="#features" className="block text-gray-700 hover:text-primary transition-colors">Features</a></li>
                <li><a href="#about" className="block text-gray-700 hover:text-primary transition-colors">About</a></li>
              </ul>
            </nav>
            {!user && (
              <div className="mt-4 flex flex-col space-y-2">
                <Link to="/login">
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Button className="w-full">Get Started</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
