'use client';
import React from 'react';
import { Button } from '../button/Button';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '@/redux/sidebarSlice/sidebarSlice';
import { RootState } from '@/redux/store';

export const Navbar = () => {
  const { resolvedTheme } = useTheme();
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.sidebar);
  return (
    <nav className="flex items-center gap-4 bg-primary md:gap-0">
      <div
        className={`pl-4 py-5 min-h-[50px] md:px-6 md:py-[40.5px] md:min-w-[264px]  ${
          isOpen ? '' : 'md:border-lines  md:border-b'
        } md:relative`}
      >
        <Image
          src="/logo-mobile.svg"
          alt="logo-mobile"
          width={24}
          height={24}
          className="md:hidden"
        />
        <Image
          src={`/logo-${resolvedTheme === 'dark' ? 'light' : 'dark'}.svg`}
          alt="logo-mobile"
          width={150}
          height={24}
          className="hidden md:block"
        />
      </div>
      <div className="flex items-center justify-between w-full pr-4 py-5 md:px-6 md:py-7 md:border-l lg:px-8 md:border-b md:border-lines">
        <div className="flex gap-2 items-center cursor-pointer">
          <h1 className="text-base font-semibold md:text-xl">
            Platform Launch
          </h1>
          <Image
            src="/icon-chevron-down.svg"
            alt="logo-mobile"
            width={8}
            height={4}
            className="md:hidden"
            onClick={() => dispatch(toggle())}
          />
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <div className="bg-mainPurpleHover opacity-50 px-18px p-[10px] md:flex-[2] rounded-3xl md:hidden">
            <Image
              src="/icon-add-task-mobile.svg"
              alt="logo-mobile"
              width={12}
              height={12}
              className=""
            />
          </div>
          <Button
            size="lg"
            label="+ Add New Task"
            className="hidden md:block md:px-6"
          />
          <Image
            src="/icon-vertical-ellipsis.svg"
            alt="logo-mobile"
            width={4}
            height={16}
            className="cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
};
