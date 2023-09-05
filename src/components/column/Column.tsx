import { Column as ColumType } from '@/types';
import React from 'react';
import { TaskCard } from '../taskCard/TaskCard';
interface Props {
  colum: ColumType;
}

export const Column = ({ colum }: Props) => {
  return (
    <div>
      <p>{colum.name}</p>
      <div className="">
        {colum.tasks.map((task, index) => (
          <TaskCard key={`task-${task.title}-${index}`} item={task} />
        ))}
      </div>
    </div>
  );
};
