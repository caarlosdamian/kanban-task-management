import React from 'react';
import { Button } from '..';

interface Props {
  title: string;
  buttonLabel: string;
  onClick?: () => void;
}

export const Empty = ({ title, buttonLabel, onClick }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 h-screen w-screen gap-6">
      <p className="text-lg text-mediumGray text-center max-w-[450px]">
        {title}
      </p>
      <Button
        size="lg"
        label={buttonLabel}
        className="max-w-[174px]"
        onClick={onClick}
      />
    </div>
  );
};
