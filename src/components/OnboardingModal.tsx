import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ open, onOpenChange }) => {
  const { user, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Update user metadata in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          // Store onboarding data as a JSON object in the metadata field
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
          // Mark onboarding as completed
          onboarding_completed: true
        })
        .eq('id', user.id);

      if (error) throw error;
      
      toast({
        title: "Profile updated!",
        description: "Your profile information has been saved successfully.",
      });
      
      // Refresh the user profile
      await refreshProfile();
      
      // Close the modal
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message || "There was a problem saving your information.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-4">Demographics & Background</h3>
            
            <div className="grid grid-cols-2 gap-4">
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
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-4">Current Status & Experience</h3>
            
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
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-4">Interests & Skills</h3>
            
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
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-4">Work Preferences</h3>
            
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
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-center gradient-text text-2xl">
            Tell Us About Yourself
          </DialogTitle>
          <DialogDescription className="text-center">
            Help us personalize your career guidance experience by sharing some information about yourself.
            {step}/4
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="w-full bg-gray-200 h-2 mb-6 rounded-full">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
          
          {renderStepContent()}
        </div>
        
        <DialogFooter className="sm:justify-between flex items-center mt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleBack}
            disabled={step === 1 || loading}
            className={step === 1 ? 'opacity-0' : ''}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
          
          <Button 
            type="button" 
            onClick={handleNext}
            disabled={loading}
          >
            {loading ? (
              <>Loading...</>
            ) : step < 4 ? (
              <>
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Complete
                <Check className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
