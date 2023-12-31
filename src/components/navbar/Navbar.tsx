'use client';
import React, { useState } from 'react';
import { Button } from '../button/Button';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '@/redux/sidebarSlice/sidebarSlice';
import { RootState } from '@/redux/store';
import { OptionMenu } from '..';
import { toggleModalType } from '@/redux/modalSlice/ModalSlice';
import { deleteBoard } from '@/redux/boardSlice/boardSlice';
import { getActiveBoard } from '@/redux/selectors/boardSelectors';
import { Board } from '@/types';

const Navbar = () => {
  const { resolvedTheme } = useTheme();
  const dispatch = useDispatch();
  const {
    sidebar: { isOpen },
    boards,
  } = useSelector((state: RootState) => state);
  const [optionsOpen, setOptionsOpen] = useState(false);

  const handleEditBoard = () => {
    dispatch(toggleModalType('editBoard'));
    setOptionsOpen(false);
  };
  const handleDeleteBoard = () => {
    dispatch(toggleModalType('deleteBoard'));
    setOptionsOpen(false);
  };
  const activeBoard = getActiveBoard(boards);
  const addTaskButtonDisable =
    boards.length === 0 ? true : !Boolean(activeBoard[0]?.columns.length !== 0);

  return (
    <nav className="h-[64px] md:h-20 lg:h-[97px] z-20 relative">
      <div className="fixed md:h-20 lg:h-[97px] left-0 right-0 flex items-center justify-start gap-4 bg-primary md:gap-0 max-h-[97px]">
        <div
          className={`pl-4 py-5 min-h-[50px] md:pt-8 md:min-h-[80px] lg:min-h-[97px] md:px-6 md:min-w-[264px] md:border-lines lg:items-center lg:flex lg:justify-center ${
            isOpen ? '' : 'md:border-b'
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
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => dispatch(toggle())}
          >
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
            />
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div
              className={`bg-mainPurple ${
                addTaskButtonDisable ? 'opacity-50 cursor-not-allowed' : ''
              } px-18px p-[10px] md:flex-[2] rounded-3xl md:hidden`}
              onClick={
                addTaskButtonDisable
                  ? undefined
                  : () => dispatch(toggleModalType('addTask'))
              }
            >
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
              onClick={() => dispatch(toggleModalType('addTask'))}
              disabled={addTaskButtonDisable}
            />
            <Image
              src="/icon-vertical-ellipsis.svg"
              alt="logo-mobile"
              width={4}
              height={16}
              className="cursor-pointer"
              onClick={() => setOptionsOpen(!optionsOpen)}
            />
            {optionsOpen && (
              <OptionMenu
                optionOne="Edit Board"
                optiontTwo="Delete Board"
                handleClickOptionOne={handleEditBoard}
                handleClickOptionTwo={handleDeleteBoard}
                handleClosed={setOptionsOpen}
                className="top-full right-6"
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
