import { Task } from '@/types';
import React from 'react';
interface Props {
  item: Task;
}

export const TaskCard = ({ item }: Props) => {
  const totalTask = 2;
  const completedTask = 1;
  return (
    <div className="cursor-pointer">
      <p>{item.title}</p>
      <p></p>
    </div>
  );
};
