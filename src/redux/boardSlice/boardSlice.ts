import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '@/data';

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setActiveBoard: (state, { payload }) => {
      state.boards = state.boards.map((board) => ({
        ...board,
        isActive: board.id === payload ? true : false,
      }));
    },
  },
});

// Action creators are generated for each case reducer function
export const { setActiveBoard } = boardSlice.actions

export default boardSlice.reducer;
