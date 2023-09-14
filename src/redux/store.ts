import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './boardSlice/boardSlice';
import sidebarReducer from './sidebarSlice/sidebarSlice';
import modalReducer from './modalSlice/ModalSlice';

export const store = configureStore({
  reducer: {
    boards: boardReducer,
    sidebar: sidebarReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
