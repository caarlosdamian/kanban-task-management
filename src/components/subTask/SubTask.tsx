import Image from 'next/image';
import React from 'react';
import { Select } from '../select/Select';

interface Props {
  title: string;
  isCompleted: boolean;
  handleClick: (index: number) => void;
  subtaskIndex: number;
}

export const SubTask = ({
  isCompleted,
  title,
  subtaskIndex,
  handleClick,
}: Props) => {
  return (
    <div
      className="flex items-center gap-4 bg-content pl-3 pr-2 py-3 rounded min-h-full hover:bg-mainPurple hover:bg-opacity-25 cursor-pointer"
      onClick={() => handleClick(subtaskIndex)}
    >
      <div
        className={`${
          isCompleted
            ? 'bg-mainPurple ring-mainPurple'
            : 'bg-white ring-mediumGray ring-opacity-25'
        } ring-1  rounded-sm h-4 w-4 cursor-pointer flex items-center justify-center`}
      >
        {isCompleted && (
          <Image src="/icon-check.svg" alt="check" width={8} height={8} />
        )}
      </div>
      <div className="max-w-[220px]">
        <h2
          className={`text-xs font-bold break-all ${
            isCompleted ? 'opacity-50 line-through' : ''
          }`}
        >
          {title}
        </h2>
      </div>
    </div>
  );
};
