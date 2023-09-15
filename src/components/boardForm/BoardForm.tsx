'use client';
import React from 'react';
import { Modal, TextField } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModalType } from '@/redux/modalSlice/ModalSlice';
import { RootState } from '@/redux/store';
import { ArrayInput } from '../arrayInput/ArrayInput';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BoardForm = () => {
  const dispatch = useDispatch();
  const { type } = useSelector((state: RootState) => state.modal);
  const handleClosed = () => {
    dispatch(toggleModalType('idle'));
  };
  return (
    <Modal
      isOpen={type === 'addBoard' || type === 'editBoard'}
      onOverlayClick={handleClosed}
      className="bg-primary min-w-[343px] h-[413px] z-50 top-40 p-8"
    >
      <div className="">
        <h1 className="text-lg font-bold bg-primary">BoardForm</h1>
        <TextField placeholder="testing" error="dsdds" />
        <ArrayInput placeholder="Prueba" handleClosed={() => console.log('')} />
      </div>
    </Modal>
  );
};
