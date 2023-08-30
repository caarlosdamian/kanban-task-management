import React, { ReactNode } from 'react';

export const Modal = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`bg-black bg-opacity-25 h-screen w-screen fixed top-0 left-0 ${className}`}>
      <div
        className={`bg-primary fixed left-0 right-0 m-auto w-fit rounded-md ${className}`}
      >
        {children}
      </div>
    </div>
  );
};