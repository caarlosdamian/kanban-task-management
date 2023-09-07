'use client';
import { toggle } from '@/redux/sidebarSlice/sidebarSlice';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const SidebarControl = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.sidebar);
  return (
    <>
      {isOpen ? null : (
        <div
          className={`hidden cursor-pointer absolute w-14 h-12 rounded-r-[100px] bg-mainPurple left-0 top-[calc(100vh-80px)] items-center justify-center ${
            isOpen ? 'hidden' : 'md:flex'
          }`}
          onClick={() => dispatch(toggle())}
        >
          <Image
            src="./icon-show-sidebar.svg"
            height={10}
            width={16}
            alt="sidebar-show"
          />
        </div>
      )}
    </>
  );
};
