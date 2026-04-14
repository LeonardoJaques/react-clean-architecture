import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { moviesService } from '../../ifrastructure/movies/movies.service';
import type { MediaItem } from '../../ifrastructure/movies/movie.types';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ query, type }: { query: string; type: 'movie' | 'tv' | 'episode' }) => {
    const data = await moviesService.searchMedia(query, type);
    return { data, query, type };
  }
);

interface MoviesState {
  items: MediaItem[];
  loading: boolean;
  error: string | null;
  lastQuery: string;
  lastType: 'movie' | 'tv' | 'episode';
}

const initialState: MoviesState = {
  items: [],
  loading: false,
  error: null,
  lastQuery: '',
  lastType: 'movie',
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<{ data: MediaItem[]; query: string; type: 'movie' | 'tv' | 'episode' }>) => {
        state.loading = false;
        state.items = action.payload.data;
        state.lastQuery = action.payload.query;
        state.lastType = action.payload.type;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch movies';
      });
  },
});

export default moviesSlice.reducer;
