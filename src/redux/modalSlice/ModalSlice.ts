import { createSlice } from '@reduxjs/toolkit';

type ModalType =
  | 'editTask'
  | 'addTask'
  | 'deleteBoard'
  | 'addBoard'
  | 'editBoard'
  | 'deleteBoard'
  | 'idle';

const initialState: { type: ModalType } = {
  type: 'idle',
};

export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleModalType: (state, { payload }: { payload: ModalType }) => {
      state.type = payload;
    },
  },
});

export const { toggleModalType } = modalSlice.actions;

export default modalSlice.reducer;
