
import { supabase } from '@/integrations/supabase/client';

interface CourseraContent {
  courses: Array<{
    name: string;
    link: string;
    partner: string;
  }>;
  articles: Array<{
    title: string;
    link: string;
    author?: string;
  }>;
}

export const fetchCourseraContent = async (query: string): Promise<CourseraContent> => {
  try {
    const { data, error } = await supabase.functions.invoke('fetch-coursera-content', {
      body: { query }
    });

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error fetching Coursera content:', err);
    return { courses: [], articles: [] };
  }
};
