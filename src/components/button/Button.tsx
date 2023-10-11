import { useTheme } from 'next-themes';
import React, {
  ButtonHTMLAttributes,
  HtmlHTMLAttributes,
  useMemo,
} from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'sm' | 'lg';
  variant?: 'primary' | 'secondary' | 'destructive';
  label: string;
}

export const Button = ({
  className = '',
  size,
  variant = 'primary',
  label,
  type,
  ...props
}: Props) => {
  const sizeBaseStyling = useMemo(
    () =>
      size === 'sm'
        ? 'py-2 rounded-[20px] text-xs font-bold leading-6'
        : 'py-[14px] rounded-3xl text-[15px] font-bold leading-normal',
    [size]
  );
  const { resolvedTheme } = useTheme();
  const variantBaseStyling = useMemo(() => {
    switch (variant) {
      case 'destructive':
        return 'bg-error text-white hover:bg-errorHover';
      case 'secondary':
        return `bg-mainPurple bg-opacity-10 text-mainPurple hover:bg-mainPurpleHover hover:bg-opacity-25 ${
          resolvedTheme === 'dark' && 'bg-white hover:bg-white'
        }`;
      default:
        return 'bg-mainPurple text-white hover:bg-mainPurpleHover';
    }
  }, [variant, resolvedTheme]);
  return (
    <button
      className={`${sizeBaseStyling} ${variantBaseStyling} cursor-pointer w-full ${className} disabled:opacity-40 disabled:cursor-not-allowed`}
      type={type}
      {...props}
    >
      {label}
    </button>
  );
};
