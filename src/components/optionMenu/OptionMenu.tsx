'use client';
import { toggleModalType } from '@/redux/modalSlice/ModalSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

interface Props {
  handleClosed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OptionMenu = ({ handleClosed }: Props) => {
  const dispatch = useDispatch();
  return (
    <div className="rounded-lg absolute p-4 bg-primary top-full right-6 min-w-[192px] shadow-xl font-medium text-sm flex flex-col gap-4">
      <span
        className="text-mediumGray cursor-pointer"
        onClick={() => {
          dispatch(toggleModalType('editBoard'));
          handleClosed(false);
        }}
      >
        Edit Board
      </span>
      <span className="text-error cursor-pointer">Delete Board</span>
    </div>
  );
};
