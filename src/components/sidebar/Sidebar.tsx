'use client';
import React, { useMemo } from 'react';
import { Modal } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '@/redux/sidebarSlice/sidebarSlice';
import { RootState } from '@/redux/store';
import { useDevice } from '@/hooks/useDevice';
import Image from 'next/image';
import { setActiveBoard } from '@/redux/boardSlice/boardSlice';
import dynamic from 'next/dynamic';

const Toggle = dynamic(() => import('../toggle/Toggle'), {
  ssr: false,
});

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
      } h-full w-[264px] shadow-2xl md:shadow-none md:h-screen bg-primary md:max-w-[300px] md:min-[260px] py-4`}
    >
      <div className="flex flex-col gap-5">
        <div className="px-6">
          <p className="text-mediumGray text-xs font-bold tracking-[2.4px]">
            ALL BOARDS ({amount})
          </p>
        </div>
        <div className="flex flex-col">
          {boards.map((board) => (
            <div
              className={`${
                board.isActive ? 'bg-mainPurple text-white ' : ''
              } max-w-[240px] flex gap-3 items-center text-mediumGray text-base font-medium px-6 py-[14px]`}
              key={`${board.name}-${board.id}`}
              style={{
                borderRadius: board.isActive ? '0px 100px 100px 0px' : '',
              }}
              onClick={() => dispatch(setActiveBoard(board.id))}
            >
              <Image
                src="./icon-board.svg"
                alt="board"
                width={16}
                height={16}
                style={{ filter: board.isActive ? 'brightness(2)' : '' }}
              />
              <p>{board.name}</p>
            </div>
          ))}
          <div
            className={`max-w-[240px] flex gap-3 items-center text-mediumGray text-base font-medium py-[14px] px-6 mb-3`}
            onClick={() => {}}
          >
            <Image
              src="./icon-board-purple.svg"
              alt="board"
              width={16}
              height={16}
            />
            <p className="text-mainPurple">+ Create New Board</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center px-4">
        <div className="items-center justify-center bg-content w-full flex py-14px gap-6">
          <Image
            src="./icon-light-theme.svg"
            alt="board"
            width={18}
            height={18}
          />
          <Toggle />
          <Image
            src="./icon-dark-theme.svg"
            alt="board"
            width={18}
            height={18}
          />
        </div>
      </div>
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
