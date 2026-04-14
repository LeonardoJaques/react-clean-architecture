import moviesApis from '../api/http';
import type { MediaItem, MediaDetails } from './movie.types';

export const moviesService = {
  // Search media by query. Type corresponds to dropdown: 'movie' | 'tv' | 'episode'
  // Note: The episodes endpoint on TMDB works differently, so we fallback to 'tv' or search for 'tv'.
  searchMedia: async (query: string, type: 'movie' | 'tv' | 'episode' = 'movie'): Promise<MediaItem[]> => {
    // If 'episode', we just search for TV shows as a fallback to demonstrate, 
    // since pure episode search without tv_id is not a direct TMDB feature.
    const searchType = type === 'episode' ? 'tv' : type;

    const response = await moviesApis.get(`/search/${searchType}`, {
      params: { query }
    });

    return response.data.results.map((item: any) => ({
      id: item.id,
      title: item.title || item.name,
      poster_path: item.poster_path,
      media_type: searchType,
    }));
  },

  getDetails: async (id: number, type: 'movie' | 'tv'): Promise<MediaDetails> => {
    const response = await moviesApis.get(`/${type}/${id}`);
    const data = response.data;
    
    return {
      id: data.id,
      title: data.title || data.name,
      poster_path: data.poster_path,
      media_type: type,
      overview: data.overview,
      release_date: data.release_date || data.first_air_date,
      vote_average: data.vote_average,
      genres: data.genres,
    };
  }
};
