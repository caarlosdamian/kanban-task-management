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
      const activeBoard = current(state).filter((board) => board.isActive);
      const activeBoardIndex = current(state)
        .map((item, index) => item.isActive && index)
        .filter((board) => board !== false);
      const movedTask = activeBoard[0].columns[prevColIndex].tasks[taskIndex];
      const prevTask = activeBoard[0].columns[prevColIndex].tasks[newTaskIndex];

      const newState = current(state).map((item) =>
        item.isActive
          ? {
              ...activeBoard[0],
              columns: [
                ...activeBoard[0].columns,
                activeBoard[0].columns[prevColIndex].tasks.map(
                  (task, index) => {
                    if (index === newTaskIndex) {
                      return activeBoard[0].columns[prevColIndex].tasks[
                        taskIndex
                      ];
                    } else if (index === taskIndex) {
                      return activeBoard[0].columns[prevColIndex].tasks[
                        newTaskIndex
                      ];
                    }
                  }
                ),
              ],
            }
          : item
      );

      // console.log([activeBoardIndex[0]]);
      // state = sta;
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

      const newBoardState = {
        ...activeBoard[0],
        columns: activeBoard[0].columns.map((colum, index) => {
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
        }),
      };

      return state.map((board) => {
        if (board.isActive) {
          return newBoardState;
        }
        return board;
      });
    },
  },
});

export const { setActiveBoard, toggleTask, toggleColum } = boardSlice.actions;

export default boardSlice.reducer;
