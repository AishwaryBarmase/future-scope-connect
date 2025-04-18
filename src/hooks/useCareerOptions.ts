
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface CareerCategory {
  id: string;
  title: string;
  slug: string;
}

export interface CareerOption {
  id: string;
  title: string;
  description: string;
  category_id: string;
  keywords: string[];
}

export const useCareerOptions = () => {
  const [categories, setCategories] = useState<CareerCategory[]>([]);
  const [careerOptions, setCareerOptions] = useState<CareerOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCareerData = async () => {
      try {
        // Fetch career categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('career_categories')
          .select('*')
          .order('title');

        // Fetch career options
        const { data: optionsData, error: optionsError } = await supabase
          .from('career_options')
          .select('*')
          .order('title');

        if (categoriesError) throw categoriesError;
        if (optionsError) throw optionsError;

        setCategories(categoriesData || []);
        setCareerOptions(optionsData || []);
      } catch (err) {
        console.error('Error fetching career data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCareerData();
  }, []);

  return { categories, careerOptions, loading, error };
};
