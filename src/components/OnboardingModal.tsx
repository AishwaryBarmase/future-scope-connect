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
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useOnboardingForm } from '@/hooks/useOnboardingForm';
import { DemographicsStep } from './onboarding/DemographicsStep';
import { ExperienceStep } from './onboarding/ExperienceStep';
import { InterestsStep } from './onboarding/InterestsStep';
import { PreferencesStep } from './onboarding/PreferencesStep';

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ open, onOpenChange }) => {
  const { user, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { formData, handleInputChange, handleSelectChange, getMetadataObject } = useOnboardingForm();

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
      const { error } = await supabase
        .from('profiles')
        .update({
          metadata: getMetadataObject(),
          onboarding_completed: true
        })
        .eq('id', user.id);

      if (error) throw error;
      
      await refreshProfile();
      
      toast({
        title: "Profile updated!",
        description: "Your profile information has been saved successfully.",
      });
      
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
          <DemographicsStep 
            formData={formData}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
          />
        );
      case 2:
        return (
          <ExperienceStep 
            formData={formData}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
          />
        );
      case 3:
        return (
          <InterestsStep 
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      case 4:
        return (
          <PreferencesStep 
            formData={formData}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
          />
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
