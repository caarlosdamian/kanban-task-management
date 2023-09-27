import { toggleTask } from '@/redux/boardSlice/boardSlice';
import { toggleModalType } from '@/redux/modalSlice/ModalSlice';
import { Task } from '@/types';
import React from 'react';
import { useDispatch } from 'react-redux';
interface Props {
  item: Task;
  colIndex: number;
  task: number;
}

export const TaskCard = ({ item, colIndex, task }: Props) => {
  const dispatch = useDispatch();

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

  return (
    <div
      className="cursor-pointer py-6 px-4 bg-primary rounded-lg"
      style={{ boxShadow: '0px 4px 6px 0px rgba(54, 78, 126, 0.10)' }}
      draggable
      onDragStart={handleOnDrag}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={()=> dispatch(toggleModalType('editTask'))}
    >
      <p className="text-secondary text-[15px] leading-normal font-bold">
        {item.title}
      </p>
      <p className="text-xs text-mediumGray font-bold">0 of 3 substasks</p>
    </div>
  );
};
