
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
}

export const useYouTubeVideos = (query: string, maxResults: number = 6) => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      if (!query) {
        setVideos([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase.functions.invoke('fetch-youtube-videos', {
          body: { query, maxResults }
        });

        if (fetchError) throw fetchError;

        // Transform the videos to include embed URLs
        const transformedVideos = data.videos.map((video: YouTubeVideo) => ({
          ...video,
          videoUrl: `https://www.youtube.com/embed/${video.id}` // Convert to embed URL
        }));

        setVideos(transformedVideos);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching YouTube videos:', err);
        setError(err instanceof Error ? err.message : 'An error occurred fetching videos');
        setLoading(false);
      }
    };

    fetchYouTubeVideos();
  }, [query, maxResults]);

  return { videos, loading, error };
};
