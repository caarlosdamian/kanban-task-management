'use client';
import React from 'react';
import { Modal, Sidebar } from '..';
import { useDispatch } from 'react-redux';
import { toggle } from '@/redux/sidebarSlice/sidebarSlice';

export const SidebarPop = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggle());
  };

  return (
    <Modal className={`top-20`} onOverlayClick={handleClose}>
      <Sidebar />
    </Modal>
  );
};
