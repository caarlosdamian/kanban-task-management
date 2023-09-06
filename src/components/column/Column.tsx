import { Column as ColumType } from '@/types';
import React from 'react';
import { TaskCard } from '../taskCard/TaskCard';
interface Props {
  colum: ColumType;
  colIndex: number;
}

export const Column = ({ colum, colIndex }: Props) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData('text')
    );
    if(prevColIndex !== colIndex){
      console.log('diferente')
    }
  };
  return (
    <div onDrop={handleDrop} className="flex flex-col gap-6 w-[280px]">
      <p>{colum.name}</p>
      <div className="flex flex-col gap-5">
        {colum.tasks.map((task, index) => (
          <TaskCard
            colIndex={colIndex}
            taskIndex={index}
            key={`task-${task.title}-${index}`}
            item={task}
          />
        ))}
      </div>
    </div>
  );
};
