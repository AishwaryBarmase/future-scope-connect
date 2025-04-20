
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { OnboardingFormData } from '@/hooks/useOnboardingForm';

interface InterestsStepProps {
  formData: OnboardingFormData;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const InterestsStep = ({ formData, onInputChange }: InterestsStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center mb-4">Interests & Skills</h3>
      
      <div className="space-y-2">
        <Label htmlFor="careerInterests">Career Interests</Label>
        <Textarea 
          id="careerInterests" 
          name="careerInterests" 
          value={formData.careerInterests} 
          onChange={onInputChange} 
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
          onChange={onInputChange} 
          placeholder="What skills and strengths do you possess? (e.g., Communication, Problem-solving, Programming)" 
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

