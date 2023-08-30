'use client';
import React from 'react';
import { Button } from '../button/Button';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export const Navbar = () => {
  const { resolvedTheme } = useTheme();
  //
  return (
    <nav className="flex items-center gap-4 bg-primary  border-b border-lines">
      <div className="md:border-r md:border-lines w-full pl-4 py-5 md:pt-7 md:px-6 min-w-[260px] max-w-[300px] flex-1">
        <Image
          src="/logo-mobile.svg"
          alt="logo-mobile"
          width={24}
          height={24}
          className="md:hidden "
        />
        <Image
          src={`/logo-${resolvedTheme === 'dark' ? 'light' : 'dark'}.svg`}
          alt="logo-mobile"
          width={150}
          height={24}
          className="hidden md:block"
        />
      </div>
      <div className="flex items-center justify-between w-full  pr-4 py-5 md:px-6 md:py-7">
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
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-mainPurpleHover opacity-50 px-18px p-[10px] flex-[2] rounded-3xl md:hidden">
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
            className="hidden md:block"
          />
          <Image
            src="/icon-vertical-ellipsis.svg"
            alt="logo-mobile"
            width={4}
            height={16}
          />
        </div>
      </div>
    </nav>
  );
};
