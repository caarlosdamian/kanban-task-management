import { Board as BoardType } from '@/types';
import React from 'react';
import { Column } from '../column/Column';

interface Props {
  board: BoardType;
}
export const Board = ({ board }: Props) => {
  return (
    <div className="flex w-full px-4 py-6 gap-6">
      {board.columns.map((colum) => (
        <Column colum={colum} key={colum.name} />
      ))}
      <div className="w-screen h-full">d</div>
    </div>
  );
};
