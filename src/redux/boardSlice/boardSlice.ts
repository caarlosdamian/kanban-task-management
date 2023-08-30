import { createSlice } from '@reduxjs/toolkit';
import { initialState } from '@/data';

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = boardSlice.actions

export default boardSlice.reducer;
