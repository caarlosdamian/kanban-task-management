'use client';
import { Column } from '@/types';
import Image from 'next/image';
import React, { useState } from 'react';

export const Select = ({
  options,
  onChange,
  valueKey,
  initialValue,
}: {
  options: any;
  onChange: any;
  valueKey: string;
  initialValue: any;
}) => {
  const [isOpen, setisOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState<undefined | number | string>(
    initialValue
  );

  const handleSelect = (index: any) => {
    setItemSelected(index);
    onChange(index);
  };

  return (
    <div
      className="relative flex items-center justify-between px-4 py-2 ring-1 ring-mediumGray ring-opacity-25 rounded cursor-pointer"
      onClick={() => setisOpen(!isOpen)}
    >
      <h2 className="text-13px font-medium leading-6">
        {
          // @ts-ignore
          itemSelected[valueKey]
        }
      </h2>
      <Image
        src="/icon-chevron-down.svg"
        alt="logo-mobile"
        width={8}
        height={4}
        className={`pointer-events-none  transition-all ease-in-out  ${
          false ? 'rotate-180' : ''
        }`}
      />
      {isOpen && (
        <div className="absolute top-[60px] left-0 w-full min-h-[50px] bg-primary rounded-lg p-4 flex flex-col gap-2">
          {options.map((option: Column, index: number) => (
            <h2
              // @ts-ignore
              key={option[valueKey]}
              className="text-13px text-mediumGray font-medium leading-6"
              onClick={() => handleSelect({ ...option, index })}
            >
              {
                // @ts-ignore
                option[valueKey]
              }
            </h2>
          ))}
        </div>
      )}
    </div>
  );
};
