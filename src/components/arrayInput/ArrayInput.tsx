import React from 'react';
import { TextField } from '..';
import Image from 'next/image';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  handleClosed: () => void;
}

export const ArrayInput = ({ handleClosed, ...props }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <TextField {...props} />
      <Image src="./icon-cross.svg" alt="cross" onClick={handleClosed} width={15} height={15}/>
    </div>
  );
};
