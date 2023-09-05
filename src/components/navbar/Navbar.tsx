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
    <nav className="h-[64px] md:h-20  lg:h-[97px]">
      <div className="fixed md:h-20 lg:h-[97px] left-0 right-0 flex items-center justify-start gap-4 bg-primary md:gap-0 max-h-[97px]">
        <div
          className={`pl-4 py-5 min-h-[50px] md:min-h-[80px] lg:min-h-[97px] md:px-6 md:min-w-[264px] lg:items-center lg:flex lg:justify-center${
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
            src={`${
              resolvedTheme === 'dark' && resolvedTheme !== undefined
                ? './logo-light.svg'
                : './logo-dark.svg'
            }`}
            alt="logo-mobile"
            width={150}
            height={24}
            className="hidden md:block"
          />
        </div>
        <div className="flex items-center justify-between w-full pr-4 py-5 md:px-6 md:py-4 md:border-l lg:px-8 md:border-b md:border-lines md:max-h-20  lg:pt-5 lg:pb-7 lg:max-h-[97px]">
          <div className="flex gap-2 items-center cursor-pointer">
            <h1 className="text-base font-semibold md:text-xl">
              Platform Launch
            </h1>
            <Image
              src="/icon-chevron-down.svg"
              alt="logo-mobile"
              width={8}
              height={4}
              className={`md:hidden transition-all ease-in-out  ${
                isOpen ? 'rotate-180' : ''
              }`}
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
      </div>
    </nav>
  );
};
