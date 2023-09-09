import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './boardSlice/boardSlice';
import sidebarReducer from './sidebarSlice/sidebarSlice';

export const store = configureStore({
  reducer: {
    boards: boardReducer,
    sidebar: sidebarReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
