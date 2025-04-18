
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    const apiKey = Deno.env.get('COURSERA_API_KEY');
    const apiSecret = Deno.env.get('COURSERA_API_SECRET');

    if (!query) {
      return new Response(
        JSON.stringify({ courses: [], articles: [] }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Encode credentials
    const credentials = btoa(`${apiKey}:${apiSecret}`);

    // Fetch courses
    const coursesResponse = await fetch(
      `https://api.coursera.org/api/courses.v1?q=search&query=${encodeURIComponent(query)}&fields=name,partnerIds,courseType&includes=partnerIds`,
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
        }
      }
    );

    const coursesData = await coursesResponse.json();
    
    // Transform courses data
    const courses = (coursesData.elements || []).slice(0, 6).map((course: any) => ({
      name: course.name,
      link: `https://www.coursera.org/learn/${course.slug}`,
      partner: course.partnerIds[0] // You might want to fetch partner names separately
    }));

    // Fetch articles (using the same API but filtering for different content type)
    const articlesResponse = await fetch(
      `https://api.coursera.org/api/blogs.v1?q=search&query=${encodeURIComponent(query)}&fields=title,author,slug`,
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
        }
      }
    );

    const articlesData = await articlesResponse.json();
    
    // Transform articles data
    const articles = (articlesData.elements || []).slice(0, 6).map((article: any) => ({
      title: article.title,
      link: `https://www.coursera.org/articles/${article.slug}`,
      author: article.author
    }));

    return new Response(
      JSON.stringify({ courses, articles }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching Coursera content:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
