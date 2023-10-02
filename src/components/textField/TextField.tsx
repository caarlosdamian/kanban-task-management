import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  register: any;
  area?: boolean;
}

export const TextField = ({ error, register, area, ...props }: Props) => {
  return (
    <div
      className={`flex items-center  px-4 py-2 justify-between ring-1 ring-mediumGray ring-opacity-[.25] rounded w-full ${
        error ? 'ring-error' : ''
      }`}
    >
      {area ? (
        <textarea
          className="bg-primary active:text-secondary outline-none basis-full resize-none"
          {...register}
          {...props}
        />
      ) : (
        <input
          className="bg-primary active:text-secondary outline-none basis-full"
          {...register}
          {...props}
        />
      )}
      {error && <span className="text-error text-xs">Can’t be empty</span>}
    </div>
  );
};
