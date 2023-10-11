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

    addNewTask: (state, { payload }) => {
      const activeIndex = getActiveBoardIndex(state);
      const columnIndex = state[activeIndex].columns.findIndex((item)=>item.name === payload.status);
      state[activeIndex].columns[columnIndex].tasks.push(payload)
    },
    editBoard: (state, { payload }) => {
      const activeIndex = getActiveBoardIndex(state);
      state[activeIndex] = payload;
    },
    editTask: (state, { payload }) => {
      const { taskIndex, columIndex, ...rest } = payload;
      const activeIndex = getActiveBoardIndex(state);
      state[activeIndex].columns[columIndex].tasks[taskIndex] = { ...rest };
    },
    deleteBoard: (state) => {
      const boardLenght = state.length;
      if (boardLenght === 1) {
        return (state = []);
      }
      return (state = state
        .filter((board) => !board.isActive)
        .map((item, index) => {
          if (index === 0) {
            return { ...item, isActive: true };
          }
          return item;
        }));
    },
    deleteTask: (state, { payload }) => {
      const columnIndex = payload.columIndex;
      const taskIndex = payload.taskIndex;
      const activeIndex = getActiveBoardIndex(state);
      state[activeIndex].columns[columnIndex].tasks.splice(taskIndex, 1);
    },
    addNewBoard: (state, { payload }) => {
      state.push({ ...payload, isActive: state.length === 0 ? true : false });
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
    toggleSubtask: (state, { payload }) => {
      const activeIndex = getActiveBoardIndex(state);
      state[activeIndex].columns[payload.colIndex].tasks[
        payload.taskIndex
      ].subtasks[payload.subTaskIndex].isCompleted =
        !state[activeIndex].columns[payload.colIndex].tasks[payload.taskIndex]
          .subtasks[payload.subTaskIndex].isCompleted;
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
  addNewBoard,
  addNewTask,
  deleteBoard,
  editBoard,
  editTask,
  setActiveBoard,
  toggleColum,
  toggleSubtask,
  toggleTask,
} = boardSlice.actions;

export default boardSlice.reducer;
