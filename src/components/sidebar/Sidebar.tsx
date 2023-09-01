'use client';
import useWindowSize from '@/hooks/useWindowSize';
import React from 'react';
import { Modal } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '@/redux/sidebarSlice/sidebarSlice';
import { RootState } from '@/redux/store';

const content = (
  <aside className="h-[322px] w-[264px] shadow-2xl md:shadow-none md:h-screen bg-primary md:max-w-[300px] md:min-[260px]">
    <div className="">
      <p></p>
      <div className="">
        <p>tests</p>
      </div>
    </div>
    <div className=""></div>
  </aside>
);

export const Sidebar = () => {
  const { width } = useWindowSize();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggle());
  };

  const { isOpen } = useSelector((state: RootState) => state?.sidebar);
  return (
    <div className={`${isOpen ? 'block' : 'hidden'}`}>
      {width! < 430 ? (
        <Modal
          isOpen={isOpen}
          className={`top-20`}
          onOverlayClick={handleClose}
        >
          {content}
        </Modal>
      ) : (
        content
      )}
    </div>
  );
};
