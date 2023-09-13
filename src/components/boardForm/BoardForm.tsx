'use client';
import React from 'react';
import { Modal, TextField } from '..';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BoardForm = ({ isOpen, setIsOpen }: Props) => {
  const handleClosed = () => {
    setIsOpen(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      onOverlayClick={handleClosed}
      className="bg-primary min-w-[343px] h-[413px] z-50 top-40 p-8"
    >
      <div className="">
        <h1 className="text-lg font-bold bg-primary">BoardForm</h1>
        <TextField placeholder="testing" error="dsdds" />
      </div>
    </Modal>
  );
};
