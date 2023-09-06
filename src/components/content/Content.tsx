'use client';
import React from 'react';
import { Empty } from '..';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Board } from '../board/Board';

export const Content = () => {
  const { boards } = useSelector((state: RootState) => state.board);
  const selectedBoard = boards.filter((board) => board.isActive !== false);
  return (
    <div className="bg-content">
      {boards.length !== 0 ? (
        <Board board={selectedBoard[0]} />
      ) : selectedBoard[0].columns.length !== 0 ? (
        <Empty
          buttonLabel="+ Add New Board"
          title="There are no boards available. Create a new board to get started"
        />
      ) : (
        <Empty
          buttonLabel="+ Add New Column"
          title="This board is empty. Create a new column to get started."
        />
      )}
    </div>
  );
};
