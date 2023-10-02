'use client';
import React from 'react';
import { Modal } from '..';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedItem,
  toggleModalType,
} from '@/redux/modalSlice/ModalSlice';
import Image from 'next/image';
import { SubTask } from '../subTask/SubTask';
import { Select } from '../select/Select';
import { RootState } from '@/redux/store';
import { SelectedItemI, Subtask } from '@/types';
import { getActiveBoard } from '@/redux/selectors/boardSelectors';
import { toggleColum } from '@/redux/boardSlice/boardSlice';

export const Task = () => {
  const dispatch = useDispatch();
  const {
    modal: { selectedItem },
    boards,
  } = useSelector((state: RootState) => state);
  const { title, description, status, subtasks, taskIndex } =
    selectedItem as SelectedItemI;
  const statusColumns = getActiveBoard(boards)[0].columns;
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

  return (
    <Modal
      onOverlayClick={handleClosed}
      className="bg-primary max-w-[343px] md:min-w-[480px] min-h-[413px] z-50 top-20 p-8"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 justify-between">
            <h2 className="text-lg font-bold bg-primary">{title}</h2>
            <Image
              src="/icon-vertical-ellipsis.svg"
              alt="logo-mobile"
              width={4}
              height={16}
              className="cursor-pointer"
              // onClick={() => setOptionsOpen(!optionsOpen)}
            />
          </div>
          <h2 className="text-mediumGray text-13px leading-6 font-medium">
            {description}
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="input-label">Subtasks (2 of 3)</h2>
          <div className="flex flex-col gap-2">
            {subtasks.map((subtask: Subtask) => (
              <SubTask
                key={subtask.title}
                isCompleted={subtask.isCompleted}
                title={subtask.title}
              />
            ))}
          </div>
          <Select
            options={statusColumns}
            onChange={(e: any) =>
              dispatch(
                toggleColum({
                  colIndex: e.index,
                  prevColIndex: colIndex,
                  taskIndex: taskIndex,
                })
              )
            }
            valueKey="name"
            initialValue={initialstatus[0]}
          />
        </div>
      </div>
    </Modal>
  );
};
