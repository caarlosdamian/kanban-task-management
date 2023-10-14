'use client';
import { RootState } from '@/redux/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BoardForm } from '../boardForm/BoardForm';
import { DeleteModal } from '../deleteModal/DeleteModal';
import { deleteBoard, deleteTask } from '@/redux/boardSlice/boardSlice';
import { toggleModalType } from '@/redux/modalSlice/ModalSlice';
import { Taskboard } from '../taskBoard/Taskboard';
import { Task } from '../task/Task';
import { getActiveBoard } from '@/redux/selectors/boardSelectors';

export const ModalProvider = () => {
  const {
    modal: { type, selectedItem },
    boards,
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const activeBoard = getActiveBoard(boards)[0];

  const handleDispatch = () => {
    type === 'deleteBoard'
      ? dispatch(deleteBoard())
      : dispatch(deleteTask(selectedItem));
    dispatch(toggleModalType('idle'));
  };

  if (type === 'addBoard' || type === 'editBoard') return <BoardForm />;
  if (type === 'editTask' || type === 'addTask') return <Taskboard />;
  if (type === 'viewTask') return <Task />;
  if (type === 'deleteBoard' || type === 'deleteTask')
    return (
      <DeleteModal
        title={
          type === 'deleteBoard' ? 'Delete this board?' : 'Delete this task?'
        }
        description={
          type === 'deleteBoard'
            ? `Are you sure you want to delete the ‘${activeBoard.name}’ board? This action will remove all columns and tasks and cannot be reversed.`
            : `Are you sure you want to delete the ‘${selectedItem.title}’ task and its subtasks? This action cannot be reversed.`
        }
        handleSuccess={handleDispatch}
        handleCancel={() => dispatch(toggleModalType('idle'))}
      />
    );
  return null;
};
