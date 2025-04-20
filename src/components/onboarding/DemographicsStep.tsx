
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OnboardingFormData } from '@/hooks/useOnboardingForm';

interface DemographicsStepProps {
  formData: OnboardingFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

export const DemographicsStep = ({ formData, onInputChange, onSelectChange }: DemographicsStepProps) => {
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
            onChange={onInputChange} 
            placeholder="Your age" 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select 
            value={formData.gender} 
            onValueChange={(value) => onSelectChange('gender', value)}
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
          onChange={onInputChange} 
          placeholder="Your city or region" 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="highestEducation">Highest Education Level</Label>
        <Select 
          value={formData.highestEducation} 
          onValueChange={(value) => onSelectChange('highestEducation', value)}
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
          onChange={onInputChange} 
          placeholder="Your major or field of study" 
        />
      </div>
    </div>
  );
};

