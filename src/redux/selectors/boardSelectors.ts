import { Board } from "@/types";
import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const getActiveBoardIndex = createDraftSafeSelector(
    (state: Board[]) => {
      return state;
    },
    (state) => {
      return state.findIndex((element) => element.isActive);
    }
  );

export const getActiveBoard = createDraftSafeSelector(
    (state: Board[]) => {
      return state;
    },
    (state) => {
      return state.filter((element) => element.isActive);
    }
  );