import React from 'react';
import { Modal, Sidebar } from '..';

export const SidebarPop = ({ className }: { className: string }) => {
  return (
    <Modal className={`top-20 ${className}`}>
      <Sidebar />
    </Modal>
  );
};
