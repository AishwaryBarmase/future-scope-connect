
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { Settings, User } from "lucide-react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const { user, profile, signOut } = useAuth();
  const isMobile = useIsMobile();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  const getInitials = () => {
    if (!profile || !profile.full_name) return "U";
    return profile.full_name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase();
  };

  const getProfileName = () => {
    if (!profile) return "";
    if (profile.full_name) return profile.full_name;
    if (user?.email) return user.email.split('@')[0];
    return "User";
  };

  const getProfileData = () => {
    if (!profile || !profile.metadata) return null;
    
    try {
      if (typeof profile.metadata === 'string') {
        return JSON.parse(profile.metadata);
      }
      return profile.metadata;
    } catch (error) {
      console.error("Error parsing profile metadata:", error);
      return null;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold gradient-text">FutureScope.AI</span>
          </Link>

          {isMobile ? (
            <div className="flex items-center">
              {user ? (
                <Drawer open={showMobileMenu} onOpenChange={setShowMobileMenu}>
                  <DrawerTrigger asChild>
                    <Avatar className="h-8 w-8 cursor-pointer">
                      {profile?.avatar_url ? (
                        <AvatarImage src={profile.avatar_url} alt="Profile" />
                      ) : (
                        <AvatarFallback>{getInitials()}</AvatarFallback>
                      )}
                    </Avatar>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Menu</DrawerTitle>
                      <DrawerDescription>
                        Welcome back, {getProfileName()}
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="grid gap-4 py-4 px-4">
                      <Button
                        variant="outline"
                        className="flex justify-start"
                        onClick={() => {
                          setShowMobileMenu(false);
                          navigate('/dashboard');
                        }}
                      >
                        Dashboard
                      </Button>
                      <Button
                        variant="outline"
                        className="flex justify-start"
                        onClick={() => {
                          setShowMobileMenu(false);
                          navigate('/profile/edit');
                        }}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                      <Button
                        variant="outline"
                        className="flex justify-start"
                        onClick={() => {
                          setShowMobileMenu(false);
                          navigate('/settings');
                        }}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                    </div>
                    <DrawerFooter>
                      <Button variant="destructive" onClick={handleSignOut}>Sign Out</Button>
                      <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              ) : (
                <Button onClick={() => navigate('/login')} size="sm">
                  Sign In
                </Button>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <nav>
                <ul className="flex items-center space-x-6">
                  <li>
                    <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/#careers" className="text-gray-700 hover:text-primary transition-colors">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link to="/quiz" className="text-gray-700 hover:text-primary transition-colors">
                      Assessment
                    </Link>
                  </li>
                  {user && (
                    <li>
                      <Link to="/dashboard" className="text-gray-700 hover:text-primary transition-colors">
                        Dashboard
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center space-x-2 cursor-pointer">
                      <Avatar className="h-8 w-8">
                        {profile?.avatar_url ? (
                          <AvatarImage src={profile.avatar_url} alt="Profile" />
                        ) : (
                          <AvatarFallback>{getInitials()}</AvatarFallback>
                        )}
                      </Avatar>
                      <span className="font-medium">{getProfileName()}</span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile/edit')}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => navigate('/login')}>Sign In</Button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
