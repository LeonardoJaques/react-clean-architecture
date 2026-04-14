import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MediaItem } from '../../ifrastructure/movies/movie.types';

interface MyListState {
  items: MediaItem[];
}

const initialState: MyListState = {
  items: [],
};

export const myListSlice = createSlice({
  name: 'myList',
  initialState,
  reducers: {
    addToMyList: (state, action: PayloadAction<MediaItem>) => {
      const exists = state.items.find((item) => item.id === action.payload.id && item.media_type === action.payload.media_type);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromMyList: (state, action: PayloadAction<{ id: number; media_type: string }>) => {
      state.items = state.items.filter(
        (item) => !(item.id === action.payload.id && item.media_type === action.payload.media_type)
      );
    },
  },
});

export const { addToMyList, removeFromMyList } = myListSlice.actions;
export default myListSlice.reducer;
