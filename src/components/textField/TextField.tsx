import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const TextField = ({ error, ...props }: Props) => {
  return (
    <div className={`flex items-center  px-4 py-2 justify-between ring-1 ring-mediumGray ring-opacity-[.25] rounded w-full ${error ? 'ring-error' : ''}`}>
      <input
        className="bg-primary active:text-secondary outline-none"
        {...props}
      />
      {error && <span className="text-error text-xs">Can’t be empty</span>}
    </div>
  );
};
