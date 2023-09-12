import { Board as BoardType } from '@/types';
import React from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

const Column = dynamic(() => import('../column/Column'), {
  ssr: false,
});
interface Props {
  board: BoardType;
}

export const Board = ({ board }: Props) => {
  const { resolvedTheme } = useTheme();
  return (
    <div className="flex gap-6 w-full px-4 py-8 h-full">
      {board.columns.map((colum, index) => (
        <Column colum={colum} key={colum.name} colIndex={index} />
      ))}
      <div
        className="flex items-center justify-center h-screen w-72 mt-[38px] rounded-md cursor-pointer px-14"
        style={{
          background:
            resolvedTheme === 'dark'
              ? 'linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.13) 100%)'
              : 'linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.50) 100%)',
        }}
      >
        <span className="text-2xl font-bold text-mediumGray">+ New Column</span>
      </div>
    </div>
  );
};
