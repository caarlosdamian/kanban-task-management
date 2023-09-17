'use client';
import { Board as BoardType } from '@/types';
import dynamic from 'next/dynamic';
import { BoardForm } from '../boardForm/BoardForm';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModalType } from '@/redux/modalSlice/ModalSlice';
import { useTheme } from 'next-themes';
import { RootState } from '@/redux/store';

const Column = dynamic(() => import('../column/Column'), {
  ssr: false,
});
interface Props {
  board: BoardType;
}

export const Board = ({ board }: Props) => {
  const { resolvedTheme } = useTheme();
  const dispatch = useDispatch();
  const {
    modal: { type },
  } = useSelector((state: RootState) => state);
  return (
    <div className="flex gap-6 w-full px-4 py-8 h-full">
      {type === 'addBoard' || type === 'editBoard' ? <BoardForm /> : null}
      {board.columns.map((colum, index) => (
        <Column colum={colum} key={colum.name} colIndex={index} />
      ))}
      <div
        className={`flex items-center justify-center h-screen w-72 mt-[38px] rounded-md cursor-pointer px-14 ${
          resolvedTheme === 'dark' ? 'gradient-bg-dark' : 'gradient-bg'
        }`}
        onClick={() => dispatch(toggleModalType('editBoard'))}
      >
        <span className="text-2xl font-bold text-mediumGray">+ New Column</span>
      </div>
    </div>
  );
};
