import React, { ReactNode } from 'react';

export const Modal = ({
  children,
  className,
  isOpen = true,
  onOverlayClick = () => console.log('clicking overlay'),
}: {
  children: ReactNode;
  className?: string;
  isOpen?: boolean;
  onOverlayClick?: () => void;
}) => {
  return (
    <div className={isOpen ? 'absolute' : 'hidden'}>
      <div
        className={` bg-black bg-opacity-25 h-screen w-screen fixed top-0 left-0 rounded-lg z-40 `}
        onClick={onOverlayClick}
      ></div>
      <div
        className={`bg-primary fixed left-0 right-0 m-auto w-fit rounded-md z-50 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};
