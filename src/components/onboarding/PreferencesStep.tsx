
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { OnboardingFormData } from '@/hooks/useOnboardingForm';

interface PreferencesStepProps {
  formData: OnboardingFormData;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

export const PreferencesStep = ({ formData, onInputChange, onSelectChange }: PreferencesStepProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-center mb-4">Work Preferences</h3>
      
      <div className="space-y-2">
        <Label htmlFor="workStyle">Work Style</Label>
        <Select 
          value={formData.workStyle} 
          onValueChange={(value) => onSelectChange('workStyle', value)}
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
          onValueChange={(value) => onSelectChange('workEnvironment', value)}
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
          onChange={onInputChange} 
          placeholder="What do you value most in a career? (e.g., Work-life balance, Growth opportunities, Social impact)" 
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

