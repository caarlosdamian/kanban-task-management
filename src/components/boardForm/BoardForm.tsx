'use client';
import React from 'react';
import { Modal } from '..';

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
      className="bg-primary w-[343px] h-[413px] z-50 top-40 p-8"
    >
      <div className="h-10 w-28">
        <h1 className="text-lg font-bold bg-primary">BoardForm</h1>
      </div>
    </Modal>
  );
};
