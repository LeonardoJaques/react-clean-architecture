import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './slices/exampleSlice';
import moviesReducer from './slices/moviesSlice';
import myListReducer from './slices/myListSlice';

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    movies: moviesReducer,
    myList: myListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
