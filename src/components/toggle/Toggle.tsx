import { useTheme } from 'next-themes';
import React from 'react';

export const Toggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <div
      className="relative w-10 h-5 bg-mainPurple rounded-xl"
      onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
    >
      <div
        className={`bg-white rounded-full h-[14px] w-[14px] absolute top-[3px] left-[3px] transition-all ease-in-out se ${resolvedTheme === 'light' &&  resolvedTheme !== undefined ? '' : 'translate-x-5'} `}
      />
    </div>
  );
};
