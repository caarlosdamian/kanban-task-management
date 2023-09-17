import { createSlice, current } from '@reduxjs/toolkit';
import { initialState } from '@/data';
import { Board } from '@/types';
import {
  getActiveBoard,
  getActiveBoardIndex,
} from '../selectors/boardSelectors';

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
    editBoard: (state, { payload }) => {
      const activeIndex = getActiveBoardIndex(state);
      state[activeIndex] = payload;
    },
    addNewBoard: (state, { payload }) => {
      state.push(payload)
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
      const activeIndex = getActiveBoardIndex(state);
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
      const activeBoard = getActiveBoard(state);
      const movedTask = activeBoard[0].columns[prevColIndex].tasks[taskIndex];
      const activeIndex = getActiveBoardIndex(state);
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

export const {
  setActiveBoard,
  toggleTask,
  toggleColum,
  editBoard,
  addNewBoard,
} = boardSlice.actions;

export default boardSlice.reducer;
