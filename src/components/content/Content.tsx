'use client';
import React from 'react';
import { Empty } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Board } from '../board/Board';
import { toggleModalType } from '@/redux/modalSlice/ModalSlice';
import { ModalProvider } from '../modalProvider/ModalProvider';

export const Content = () => {
  const {
    boards,
    sidebar: { isOpen },
    modal: { type },
  } = useSelector((state: RootState) => state);
  const selectedBoard = boards?.filter((board) => board?.isActive);
  const dispatch = useDispatch();
  return (
    <div className={`bg-content ${isOpen ? 'md:ml-[300px]' : ''}`}>
      <ModalProvider />
      {boards.length !== 0 && selectedBoard[0]?.columns?.length !== 0 ? (
        <Board board={selectedBoard[0]} />
      ) : boards.length === 0 ? (
        <Empty
          buttonLabel="+ Add New Board"
          title="There are no boards available. Create a new board to get started"
          onClick={() => dispatch(toggleModalType('addBoard'))}
        />
      ) : (
        <Empty
          buttonLabel="+ Add New Column"
          title="This board is empty. Create a new column to get started."
          onClick={() => dispatch(toggleModalType('editBoard'))}
        />
      )}
    </div>
  );
};
