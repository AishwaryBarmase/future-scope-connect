
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EditProfile = () => {
  const { user, profile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    avatar_url: '',
    
    // Demographics & Background
    age: '',
    gender: '',
    location: '',
    highestEducation: '',
    fieldOfStudy: '',
    
    // Current Status & Experience
    employmentStatus: '',
    workExperience: '',
    currentRole: '',
    
    // Interests & Skills
    careerInterests: '',
    skills: '',
    
    // Personality & Work Preferences
    workStyle: '',
    workEnvironment: '',
    careerValues: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (profile) {
      const profileData = {
        full_name: profile.full_name || '',
        avatar_url: profile.avatar_url || '',
      };

      // Try to parse metadata
      try {
        const metadata = typeof profile.metadata === 'string' 
          ? JSON.parse(profile.metadata || '{}') 
          : profile.metadata || {};
        
        setFormData({
          ...profileData,
          age: metadata.age || '',
          gender: metadata.gender || '',
          location: metadata.location || '',
          highestEducation: metadata.highestEducation || '',
          fieldOfStudy: metadata.fieldOfStudy || '',
          employmentStatus: metadata.employmentStatus || '',
          workExperience: metadata.workExperience || '',
          currentRole: metadata.currentRole || '',
          careerInterests: metadata.careerInterests || '',
          skills: metadata.skills || '',
          workStyle: metadata.workStyle || '',
          workEnvironment: metadata.workEnvironment || '',
          careerValues: metadata.careerValues || '',
        });
      } catch (error) {
        console.error("Error parsing profile metadata:", error);
        setFormData(profileData);
      }
    }
  }, [user, profile, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          avatar_url: formData.avatar_url,
          metadata: JSON.stringify({
            age: formData.age,
            gender: formData.gender,
            location: formData.location,
            highestEducation: formData.highestEducation,
            fieldOfStudy: formData.fieldOfStudy,
            employmentStatus: formData.employmentStatus,
            workExperience: formData.workExperience,
            currentRole: formData.currentRole,
            careerInterests: formData.careerInterests,
            skills: formData.skills,
            workStyle: formData.workStyle,
            workEnvironment: formData.workEnvironment,
            careerValues: formData.careerValues,
          }),
          // Ensure onboarding is marked as completed
          onboarding_completed: true
        })
        .eq('id', user.id);

      if (error) throw error;
      
      await refreshProfile();
      
      toast({
        title: "Profile updated!",
        description: "Your profile information has been saved successfully.",
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message || "There was a problem updating your profile.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-purple-50">
      <Header />
      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8 gradient-text">Edit Profile</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Basic Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input 
                        id="full_name" 
                        name="full_name" 
                        value={formData.full_name} 
                        onChange={handleInputChange} 
                        placeholder="Your full name" 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="avatar_url">Profile Picture URL</Label>
                      <Input 
                        id="avatar_url" 
                        name="avatar_url" 
                        value={formData.avatar_url} 
                        onChange={handleInputChange} 
                        placeholder="https://example.com/avatar.jpg" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Demographics & Background</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input 
                        id="age" 
                        name="age" 
                        value={formData.age} 
                        onChange={handleInputChange} 
                        placeholder="Your age" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select 
                        value={formData.gender} 
                        onValueChange={(value) => handleSelectChange('gender', value)}
                      >
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="non-binary">Non-binary</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location (City/Region)</Label>
                    <Input 
                      id="location" 
                      name="location" 
                      value={formData.location} 
                      onChange={handleInputChange} 
                      placeholder="Your city or region" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="highestEducation">Highest Education Level</Label>
                      <Select 
                        value={formData.highestEducation} 
                        onValueChange={(value) => handleSelectChange('highestEducation', value)}
                      >
                        <SelectTrigger id="highestEducation">
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high-school">High School</SelectItem>
                          <SelectItem value="some-college">Some College</SelectItem>
                          <SelectItem value="associate">Associate's Degree</SelectItem>
                          <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                          <SelectItem value="master">Master's Degree</SelectItem>
                          <SelectItem value="doctorate">Doctorate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fieldOfStudy">Field of Study</Label>
                      <Input 
                        id="fieldOfStudy" 
                        name="fieldOfStudy" 
                        value={formData.fieldOfStudy} 
                        onChange={handleInputChange} 
                        placeholder="Your major or field of study" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Current Status & Experience</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employmentStatus">Current Status</Label>
                      <Select 
                        value={formData.employmentStatus} 
                        onValueChange={(value) => handleSelectChange('employmentStatus', value)}
                      >
                        <SelectTrigger id="employmentStatus">
                          <SelectValue placeholder="Select your current status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="employed">Employed</SelectItem>
                          <SelectItem value="self-employed">Self-Employed</SelectItem>
                          <SelectItem value="unemployed">Unemployed</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="workExperience">Work Experience</Label>
                      <Select 
                        value={formData.workExperience} 
                        onValueChange={(value) => handleSelectChange('workExperience', value)}
                      >
                        <SelectTrigger id="workExperience">
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no-experience">No Experience</SelectItem>
                          <SelectItem value="0-1">Less than 1 year</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currentRole">Current Role</Label>
                    <Input 
                      id="currentRole" 
                      name="currentRole" 
                      value={formData.currentRole} 
                      onChange={handleInputChange} 
                      placeholder="Your current job title/role" 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Interests & Skills</h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="careerInterests">Career Interests</Label>
                    <Textarea 
                      id="careerInterests" 
                      name="careerInterests" 
                      value={formData.careerInterests} 
                      onChange={handleInputChange} 
                      placeholder="What career fields are you interested in? (e.g., Technology, Healthcare, Arts)" 
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills & Strengths</Label>
                    <Textarea 
                      id="skills" 
                      name="skills" 
                      value={formData.skills} 
                      onChange={handleInputChange} 
                      placeholder="What skills and strengths do you possess? (e.g., Communication, Problem-solving, Programming)" 
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Work Preferences</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="workStyle">Work Style</Label>
                      <Select 
                        value={formData.workStyle} 
                        onValueChange={(value) => handleSelectChange('workStyle', value)}
                      >
                        <SelectTrigger id="workStyle">
                          <SelectValue placeholder="Select your preferred work style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="independent">Independent work</SelectItem>
                          <SelectItem value="collaborative">Collaborative work</SelectItem>
                          <SelectItem value="mix">Mix of both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="workEnvironment">Work Environment</Label>
                      <Select 
                        value={formData.workEnvironment} 
                        onValueChange={(value) => handleSelectChange('workEnvironment', value)}
                      >
                        <SelectTrigger id="workEnvironment">
                          <SelectValue placeholder="Select your preferred environment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="office">Traditional office</SelectItem>
                          <SelectItem value="remote">Remote work</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="outdoor">Outdoor/Field work</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="careerValues">Career Values</Label>
                    <Textarea 
                      id="careerValues" 
                      name="careerValues" 
                      value={formData.careerValues} 
                      onChange={handleInputChange} 
                      placeholder="What do you value most in a career? (e.g., Work-life balance, Growth opportunities, Social impact)" 
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end space-x-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/dashboard')}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditProfile;
