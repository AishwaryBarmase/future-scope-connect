
import { useState } from 'react';

export interface OnboardingFormData {
  age: string;
  gender: string;
  location: string;
  highestEducation: string;
  fieldOfStudy: string;
  employmentStatus: string;
  workExperience: string;
  currentRole: string;
  careerInterests: string;
  skills: string;
  workStyle: string;
  workEnvironment: string;
  careerValues: string;
}

const initialFormData: OnboardingFormData = {
  age: '',
  gender: '',
  location: '',
  highestEducation: '',
  fieldOfStudy: '',
  employmentStatus: '',
  workExperience: '',
  currentRole: '',
  careerInterests: '',
  skills: '',
  workStyle: '',
  workEnvironment: '',
  careerValues: '',
};

export const useOnboardingForm = () => {
  const [formData, setFormData] = useState<OnboardingFormData>(initialFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    handleInputChange,
    handleSelectChange,
  };
};

