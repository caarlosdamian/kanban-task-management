import { Task } from '@/types';
import React from 'react';
interface Props {
  item: Task;
  colIndex: number;
  taskIndex: number;
}

export const TaskCard = ({ item, colIndex, taskIndex }: Props) => {
  const totalTask = 2;
  const completedTask = 1;

  const handleDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData('text')
    );

    console.log('===prevColIndex==', prevColIndex);
    console.log('===taskIndex==', taskIndex);
  };

  const handleOnDrag = (e) => {
    e.dataTransfer.setData(
      'text',
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };
  return (
    <div
      className="cursor-pointer py-6 px-4 bg-primary rounded-lg"
      style={{ boxShadow: '0px 4px 6px 0px rgba(54, 78, 126, 0.10)' }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      draggable
      onDragStart={handleOnDrag}
    >
      <p className="text-secondary text-[15px] leading-normal font-bold">
        {item.title}
      </p>
      <p className="text-xs text-mediumGray font-bold">0 of 3 substasks</p>
    </div>
  );
};
