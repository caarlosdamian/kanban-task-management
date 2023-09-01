import React, { ReactNode } from 'react';

export const Modal = ({
  children,
  className,
  isOpen,
  onOverlayClick = () => console.log('clicking overlay'),
}: {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  onOverlayClick?: () => void;
}) => {
  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } bg-black bg-opacity-25 h-screen w-screen fixed top-0 left-0`}
      onClick={onOverlayClick}
    >
      <div
        className={`bg-primary fixed left-0 right-0 m-auto w-fit rounded-md ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
