// @ts-nocheck
'use client';
import { toggleTask } from '@/redux/boardSlice/boardSlice';
import {
  setSelectedItem,
  toggleModalType,
} from '@/redux/modalSlice/ModalSlice';
import { getActiveBoard } from '@/redux/selectors/boardSelectors';
import { RootState } from '@/redux/store';
import { Task, } from '@/types';
import { getCompletedTask } from '@/utils/common';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
interface Props {
  item: Task;
  colIndex: number;
  task: number;
}

export const TaskCard = ({ item, colIndex, task }: Props) => {
  const dispatch = useDispatch();
  const {boards} = useSelector((state:RootState)=>state)
  const activeBoard = getActiveBoard(boards)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData('text')
    );
    if (prevColIndex === colIndex) {
      dispatch(toggleTask({ prevColIndex, newTaskIndex: task, taskIndex }));
    }
  };

  const handleOnDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData(
      'text',
      JSON.stringify({ taskIndex: task, prevColIndex: colIndex })
    );
  };

  const { completedTask, total } = useMemo(
    () => getCompletedTask(item.subtasks),
    [item]
  );

  return (
    <div
      className="cursor-pointer py-6 px-4 bg-primary rounded-lg"
      style={{ boxShadow: '0px 4px 6px 0px rgba(54, 78, 126, 0.10)' }}
      draggable
      onDragStart={handleOnDrag}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => {
        dispatch(
          setSelectedItem({
            ...item,
            columIndex: colIndex,
            taskIndex: task,
            status: activeBoard[0].columns[colIndex].name
          })
        );
        dispatch(toggleModalType('viewTask'));
      }}
    >
      <p className="text-secondary text-[15px] leading-normal font-bold">
        {item.title}
      </p>
      <p className="text-xs text-mediumGray font-bold">
        {completedTask} of {total} substasks
      </p>
    </div>
  );
};
