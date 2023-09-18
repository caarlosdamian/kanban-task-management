'use client';
import React from 'react';

interface Props {
  handleClosed: React.Dispatch<React.SetStateAction<boolean>>;
  optionOne: string;
  optiontTwo: string;
  handleClickOptionOne: () => void;
  handleClickOptionTwo: () => void;
}

export const OptionMenu = ({
  handleClickOptionOne,
  handleClickOptionTwo,
  optionOne,
  optiontTwo,
}: Props) => {
  return (
    <div className="rounded-lg absolute p-4 bg-primary top-full right-6 min-w-[192px] shadow-xl font-medium text-sm flex flex-col gap-4">
      <span
        className="text-mediumGray cursor-pointer"
        onClick={handleClickOptionOne}
      >
        {optionOne}
      </span>
      <span
        className="text-error cursor-pointer"
        onClick={handleClickOptionTwo}
      >
        {optiontTwo}
      </span>
    </div>
  );
};
