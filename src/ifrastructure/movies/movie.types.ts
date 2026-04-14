export interface MediaItem {
  id: number;
  title: string; // Will map to title (movie) or name (tv)
  poster_path: string | null;
  media_type: 'movie' | 'tv';
}

export interface MediaDetails extends MediaItem {
  overview: string;
  release_date: string; // will map release_date or first_air_date
  vote_average: number;
  genres: Array<{ id: number; name: string }>;
}

export interface SearchResponse {
  page: number;
  results: any[]; // Used internally to map to MediaItem
  total_pages: number;
  total_results: number;
}
