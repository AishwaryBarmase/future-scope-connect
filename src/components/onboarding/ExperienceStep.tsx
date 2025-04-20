
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OnboardingFormData } from '@/hooks/useOnboardingForm';

interface ExperienceStepProps {
  formData: OnboardingFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

export const ExperienceStep = ({ formData, onInputChange, onSelectChange }: ExperienceStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center mb-4">Current Status & Experience</h3>
      
      <div className="space-y-2">
        <Label htmlFor="employmentStatus">Current Status</Label>
        <Select 
          value={formData.employmentStatus} 
          onValueChange={(value) => onSelectChange('employmentStatus', value)}
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
          onValueChange={(value) => onSelectChange('workExperience', value)}
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
          onChange={onInputChange} 
          placeholder="Your current job title/role" 
        />
      </div>
    </div>
  );
};

