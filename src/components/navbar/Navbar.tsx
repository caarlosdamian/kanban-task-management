'use client';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react';

export const Navbar = () => {
  const { resolvedTheme } = useTheme();
  return (
    <nav className="flex items-center gap-4 bg-primary px-4 py-5">
      <div className="">
        <Image
          src="/logo-mobile.svg"
          alt="logo-mobile"
          width={24}
          height={24}
        />
        <Image
          src={`/logo-${resolvedTheme === 'dark' ? 'light' : 'dark'}.svg`}
          alt="logo-mobile"
          width={150}
          height={24}
          className="hidden"
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-2 items-center cursor-pointer">
          <h1 className="text-base font-semibold">Platform Launch</h1>
          <Image
            src="/icon-chevron-down.svg"
            alt="logo-mobile"
            width={8}
            height={4}
            className=""
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-mainPurpleHover opacity-50 px-18px p-[10px] rounded-3xl">
            <Image
              src="/icon-add-task-mobile.svg"
              alt="logo-mobile"
              width={12}
              height={12}
            />
          </div>
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
