'use client';
import React, { useMemo, useState } from 'react';
import { Modal, OptionMenu } from '..';
import { useDispatch, useSelector } from 'react-redux';
import {
  editSelectedTask,
  setSelectedItem,
  toggleModalType,
  toggleSubTask,
} from '@/redux/modalSlice/ModalSlice';
import Image from 'next/image';
import { SubTask } from '../subTask/SubTask';
import { Select } from '../select/Select';
import { RootState } from '@/redux/store';
import { Board, SelectedItemI, Subtask } from '@/types';
import { getActiveBoard } from '@/redux/selectors/boardSelectors';
import { toggleColum, toggleSubtask } from '@/redux/boardSlice/boardSlice';
import { getCompletedTask } from '@/utils/common';

export const Task = () => {
  const dispatch = useDispatch();
  const [optionsOpen, setOptionsOpen] = useState(false);
  const {
    modal: { selectedItem },
    boards,
  } = useSelector((state: RootState) => state);
  const { title, description, status, subtasks, taskIndex } =
    selectedItem as SelectedItemI;
  const statusColumns = getActiveBoard(boards as Board[])[0].columns;
  const colIndex = statusColumns.findIndex((item) => item.name === status);
  const initialstatus = statusColumns.filter((item) => item.name === status);

  const handleClosed = () => {
    dispatch(toggleModalType('idle'));
    dispatch(
      setSelectedItem({
        title: '',
        description: '',
        status: '',
        subtasks: [],
      })
    );
  };

  const { completedTask, total } = useMemo(
    () => getCompletedTask(subtasks),
    [subtasks]
  );

  const handleCompleteSubtask = (index: number) => {
    dispatch(
      toggleSubtask({
        colIndex: selectedItem.columIndex,
        taskIndex: selectedItem.taskIndex,
        subTaskIndex: index,
      })
    );
    dispatch(
      toggleSubTask({
        subTaskIndex: index,
      })
    );
  };

  const handleEditBoard = () => {
    dispatch(toggleModalType('editTask'));
    setOptionsOpen(false);
  };
  const handleDeleteTask = () => {
    // dispatch(toggleModalType('deleteBoard'));
    // setOptionsOpen(false);
    // new implementation
  };

  return (
    <Modal
      onOverlayClick={handleClosed}
      className="bg-primary max-w-[343px] md:min-w-[480px] min-h-[413px] z-50 top-20 p-8"
    >
      <div className="flex flex-col gap-6 relative">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 justify-between">
            <h2 className="text-lg font-bold bg-primary">{title}</h2>
            <Image
              src="/icon-vertical-ellipsis.svg"
              alt="logo-mobile"
              width={4}
              height={16}
              className="cursor-pointer"
              onClick={() => setOptionsOpen(!optionsOpen)}
            />
          </div>
          <h2 className="text-mediumGray text-13px leading-6 font-medium">
            {description}
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="input-label">
            Subtasks ({completedTask} of {total})
          </h2>
          <div className="flex flex-col gap-2">
            {subtasks.map((subtask: Subtask, index) => (
              <SubTask
                handleClick={handleCompleteSubtask}
                key={subtask.title}
                subtaskIndex={index}
                isCompleted={subtask.isCompleted}
                title={subtask.title}
              />
            ))}
          </div>
          <Select
            options={statusColumns}
            onChange={(e: any) => {
              dispatch(
                toggleColum({
                  colIndex: e.index,
                  prevColIndex: colIndex,
                  taskIndex: taskIndex,
                })
              );
              dispatch(
                editSelectedTask({
                  ...selectedItem,
                  status: statusColumns[e.index].name,
                })
              );
            }}
            valueKey="name"
            initialValue={initialstatus[0]}
          />
        </div>
        {optionsOpen && (
          <OptionMenu
            optionOne="Edit Task"
            optiontTwo="Delete Task"
            handleClickOptionOne={handleEditBoard}
            handleClickOptionTwo={handleDeleteTask}
            handleClosed={setOptionsOpen}
            className="top-[98px] right-[-65px]"
          />
        )}
      </div>
    </Modal>
  );
};
