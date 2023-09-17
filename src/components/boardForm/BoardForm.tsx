'use client';
import React from 'react';
import { Button, Modal, TextField } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModalType } from '@/redux/modalSlice/ModalSlice';
import { RootState } from '@/redux/store';
import { ArrayInput } from '../arrayInput/ArrayInput';
import { useForm } from 'react-hook-form';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BoardForm = () => {
  const dispatch = useDispatch();
  const { type } = useSelector((state: RootState) => state.modal);
  const {} = useForm({ defaultValues: type === 'addBoard' ? {} : {} });
  const handleClosed = () => {
    dispatch(toggleModalType('idle'));
  };
  return (
    <Modal
      isOpen={type === 'addBoard' || type === 'editBoard'}
      onOverlayClick={handleClosed}
      className="bg-primary min-w-[480px] min-h-[413px] z-50 top-40 p-8"
    >
      <form className="flex flex-col gap-6">
        <h1 className="text-lg font-bold bg-primary">
          {type === 'addBoard' ? 'Add New Board' : 'Edit Board'}
        </h1>
        <div className="flex flex-col gap-2">
          <h2 className="input-label">Board Name</h2>
          <TextField placeholder="testing" error="dsdds" />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="input-label">Board Columns</h2>
            <div className="flex flex-col gap-3">
              <ArrayInput
                placeholder="Prueba"
                handleClosed={() => console.log('')}
              />
              <ArrayInput
                placeholder="Prueba"
                handleClosed={() => console.log('')}
              />
            </div>
          </div>
          <Button label="+ Add New Column" size={'sm'} variant="secondary" />
        </div>
        <Button
          label={type === 'addBoard' ? 'Create New Board' : 'Save Changes'}
          size={'sm'}
        />
      </form>
    </Modal>
  );
};
