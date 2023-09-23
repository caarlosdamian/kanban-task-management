'use client';
import { toggleModalType } from '@/redux/modalSlice/ModalSlice';
import React, { ReactNode } from 'react';
import { useDispatch } from 'react-redux';

export const Modal = ({
  children,
  className,
  isOpen = true,
  onOverlayClick,
}: {
  children: ReactNode;
  className?: string;
  isOpen?: boolean;
  onOverlayClick?: () => void;
}) => {
  const dispatch = useDispatch();
  return (
    <div className={isOpen ? 'absolute' : 'hidden'}>
      <div
        className={` bg-black bg-opacity-25 h-screen w-screen fixed top-0 left-0 rounded-lg z-50`}
        onClick={
          onOverlayClick
            ? onOverlayClick
            : () => dispatch(toggleModalType('idle'))
        }
      ></div>
      <div
        className={`bg-primary fixed left-0 right-0 m-auto w-fit rounded-md z-50 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
