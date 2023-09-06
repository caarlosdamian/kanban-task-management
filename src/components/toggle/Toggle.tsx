"use client"
import { useTheme } from 'next-themes';
import React from 'react';
import dynamic from 'next/dynamic';


const Toggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const className = resolvedTheme !== undefined && resolvedTheme === 'light' ? '' : 'translate-x-5';
  return (
    <div
      className="relative w-10 h-5 bg-mainPurple rounded-xl"
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
    >
      <div
        className={`bg-white rounded-full h-[14px] w-[14px] absolute top-[3px] left-[3px] transition-all ease-in-out ${className}`}
      />
    </div>
  );
};

export default Toggle