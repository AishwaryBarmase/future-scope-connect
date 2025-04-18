
import { useState, useEffect } from 'react';
import axios from 'axios';

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
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            part: 'snippet',
            q: query + ' career guide',
            type: 'video',
            maxResults,
            key: 'AIzaSyC8xD3S4VvDn1KmCCiyZgHjW-0tF3ShHGo'
          }
        });

        const fetchedVideos: YouTubeVideo[] = response.data.items.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnailUrl: item.snippet.thumbnails.medium.url,
          videoUrl: `https://www.youtube.com/embed/${item.id.videoId}`
        }));

        setVideos(fetchedVideos);
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
