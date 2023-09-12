import { createSlice, current } from '@reduxjs/toolkit';
import { initialState } from '@/data';
import { RootState } from '../store';
import { Board } from '@/types';

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setActiveBoard: (state, { payload }) => {
      return (state = state.map((board) => ({
        ...board,
        isActive: board.id === payload ? true : false,
      })));
    },
    toggleTask: (
      state: Board[],
      {
        payload,
      }: {
        payload: {
          newTaskIndex: number;
          prevColIndex: number;
          taskIndex: number;
        };
      }
    ) => {
      const { newTaskIndex, prevColIndex, taskIndex } = payload;
      const activeIndex = current(state).findIndex(
        (element) => element.isActive
      );
      const currentTask =
        current(state)[activeIndex].columns[prevColIndex].tasks[taskIndex];
      const newTask =
        current(state)[activeIndex].columns[prevColIndex].tasks[newTaskIndex];

      state[activeIndex].columns[prevColIndex].tasks = state[
        activeIndex
      ].columns[prevColIndex].tasks.map((taski, index) => {
        if (index === newTaskIndex) {
          return currentTask;
        } else if (index === taskIndex) {
          return newTask;
        }
        return taski;
      });
    },
    toggleColum: (
      state,
      {
        payload,
      }: {
        payload: { colIndex: number; prevColIndex: number; taskIndex: number };
      }
    ) => {
      const { colIndex, prevColIndex, taskIndex } = payload;
      const activeBoard = current(state).filter((board) => board.isActive);
      const movedTask = activeBoard[0].columns[prevColIndex].tasks[taskIndex];
      const activeIndex = current(state).findIndex(
        (element) => element.isActive
      );
      state[activeIndex].columns = state[activeIndex].columns.map(
        (colum, index) => {
          if (index === prevColIndex) {
            return {
              ...colum,
              tasks: colum.tasks.filter(
                (_, indexTask) => indexTask !== taskIndex
              ),
            };
          } else if (index === colIndex) {
            return {
              ...colum,
              tasks: [...colum.tasks, movedTask],
            };
          }
          return colum;
        }
      );
    },
  },
});

export const { setActiveBoard, toggleTask, toggleColum } = boardSlice.actions;

export default boardSlice.reducer;
