
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call for login
    setTimeout(() => {
      console.log("Login submitted:", formData);
      toast({
        title: "Login successful!",
        description: "Welcome back to FutureScope.AI",
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="glass-card animate-fadeIn animate-delay-300 w-full max-w-md mx-auto p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 gradient-text text-center">Log in to Your Account</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email" 
            placeholder="Enter your email" 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password" 
            placeholder="Enter your password" 
            required 
          />
        </div>
        
        <div className="flex justify-end">
          <Link to="/" className="text-sm text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in
            </>
          ) : (
            "Log in"
          )}
        </Button>
      </form>
      
      <div className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link to="/" className="text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
