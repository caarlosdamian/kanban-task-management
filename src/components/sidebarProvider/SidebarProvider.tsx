"use client"
import React from 'react';
import { SidebarPop } from '../sidebarPop/SidebarPop';
import { Sidebar } from '..';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const SidebarProvider = () => {
  const { isOpen } = useSelector((state: RootState) => state?.sidebar);
  return (
    <div className={`${isOpen ? 'block' : 'hidden'}`}>
      <div className="md:hidden">
        <SidebarPop />
      </div>
      <div className="hidden md:block">
        <Sidebar />
      </div>
    </div>
  );
};
