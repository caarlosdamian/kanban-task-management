import { Task } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

type ModalType =
  | 'editTask'
  | 'addTask'
  | 'deleteBoard'
  | 'deleteTask'
  | 'addBoard'
  | 'editBoard'
  | 'deleteBoard'
  | 'viewTask'
  | 'idle';

const initialState: { type: ModalType; selectedItem: Task } = {
  type: 'idle',
  selectedItem: {
    title: '',
    description: '',
    status: '',
    subtasks: [],
  },
};

export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleModalType: (state, { payload }: { payload: ModalType }) => {
      state.type = payload;
    },
    setSelectedItem: (state, { payload }: { payload: Task }) => {
      state.selectedItem = payload;
    },
  },
});

export const { toggleModalType, setSelectedItem } = modalSlice.actions;

export default modalSlice.reducer;
