'use client';
import React, { useMemo } from 'react';
import { Modal } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '@/redux/sidebarSlice/sidebarSlice';
import { RootState } from '@/redux/store';
import { useDevice } from '@/hooks/useDevice';
import Image from 'next/image';

export const Sidebar = () => {
  const device = useDevice();
  const dispatch = useDispatch();
  const { boards } = useSelector((state: RootState) => state.board);
  const amount = useMemo(() => boards.length, [boards]);

  const handleClose = () => {
    dispatch(toggle());
  };

  const content = (
    <aside
      className={`${
        device === 'mobile' ? 'rounded-lg' : ''
      } h-[322px] w-[264px] shadow-2xl md:shadow-none md:h-screen bg-primary md:max-w-[300px] md:min-[260px]`}
    >
      <div className="flex flex-col gap-5">
        <div className="pt-4 px-6">
          <p className='text-mediumGray text-xs font-bold tracking-[2.4px]'>ALL BOARDS ({amount})</p>
        </div>
        <div className="flex flex-col gap-3">
          {boards.map((board, index) => (
            <div
              className={`${
                board.isActive ? 'bg-mainPurple text-white ' : ''
              } max-w-[240px] flex gap-3 items-center text-mediumGray text-base font-medium py-[14px] px-6`}
              key={`${board.name}-${index}`}
              style={{
                borderRadius: board.isActive ? '0px 100px 100px 0px' : '',
              }}
            >
              <Image
                src="./icon-board.svg"
                alt="board"
                width={16}
                height={16}
              />
              <p>{board.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className=""></div>
    </aside>
  );

  const { isOpen } = useSelector((state: RootState) => state?.sidebar);
  return (
    <div className={`${isOpen ? 'block' : 'hidden'}`}>
      {device === 'mobile' ? (
        <Modal
          isOpen={isOpen}
          className={`top-20`}
          onOverlayClick={handleClose}
        >
          {content}
        </Modal>
      ) : (
        <>{content}</>
      )}
    </div>
  );
};
