'use client';
import { Column as ColumType } from '@/types';
import React, { useMemo } from 'react';
import { TaskCard } from '../taskCard/TaskCard';
import { colors } from '@/utils/common';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { toggleColum } from '@/redux/boardSlice/boardSlice';
interface Props {
  colum: ColumType;
  colIndex: number;
}

const Column = ({ colum, colIndex }: Props) => {
  const dispatch = useDispatch();
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData('text')
    );
    if (prevColIndex !== colIndex) {
      dispatch(toggleColum({ prevColIndex, colIndex, taskIndex }));
    }
  };

  const taskCount = useMemo(() => colum.tasks.length, [colum]);
  const randomColor = useMemo(
    () => _.shuffle(colors).sort(() => 0.5 - Math.random())[0],
    []
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="flex flex-col gap-6 w-[280px] h-full"
    >
      <div className="flex gap-3 items-center">
        <div
          className={`rounded-full h-[15px] w-[15px]`}
          style={{ background: `${randomColor}` }}
        ></div>
        <p className="text-mediumGray text-xs font-bold tracking-[2.4px] uppercase">
          {colum.name} {`(${taskCount})`}
        </p>
      </div>
      <div className="flex flex-col gap-5">
        {colum.tasks.map((task, index) => (
          <TaskCard
            colIndex={colIndex}
            task={index}
            key={`task-${task.title}-${index}`}
            item={task}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
