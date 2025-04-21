
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

        if (!categoriesData || categoriesData.length === 0) {
          // Insert demo data for categories if no data exists
          const demoCategories = [
            { title: 'Technology & Engineering', slug: 'technology-engineering' },
            { title: 'Business & Management', slug: 'business-management' },
            { title: 'Health & Science', slug: 'health-science' },
            { title: 'Education & Academia', slug: 'education-academia' },
            { title: 'Creative & Media', slug: 'creative-media' },
            { title: 'Miscellaneous', slug: 'miscellaneous' }
          ];
          
          for (const category of demoCategories) {
            const { data: insertedCategory, error: insertError } = await supabase
              .from('career_categories')
              .insert(category)
              .select();
              
            if (insertError) {
              console.error('Error inserting demo category:', insertError);
            }
          }
          
          // Fetch the newly inserted categories
          const { data: newCategories } = await supabase
            .from('career_categories')
            .select('*')
            .order('title');
            
          setCategories(newCategories || []);
        } else {
          setCategories(categoriesData);
        }

        if (!optionsData || optionsData.length === 0) {
          // If we have categories but no options, we'll handle this case in the UI
          setCareerOptions([]);
        } else {
          setCareerOptions(optionsData);
        }
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
