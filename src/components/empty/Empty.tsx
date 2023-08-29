import React from 'react';
import { Button } from '..';

export const Empty = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 h-full w-full gap-6">
      <p className="text-lg text-mediumGray text-center">
        This board is empty. Create a new column to get started.
      </p>
      <Button size="lg" label="+ Add New Column" className="max-w-[174px]" />
    </div>
  );
};
