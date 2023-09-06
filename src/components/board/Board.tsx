import { Board as BoardType } from '@/types';
import React from 'react';
import { Column } from '../column/Column';

interface Props {
  board: BoardType;
}
export const Board = ({ board }: Props) => {
  return (
    <div className="flex gap-6 w-full px-4 py-6">
      {board.columns.map((colum, index) => (
        <Column colum={colum} key={colum.name} colIndex={index} />
      ))}
    </div>
  );
};
