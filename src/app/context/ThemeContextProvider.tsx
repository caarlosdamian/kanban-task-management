'use client';
import { ThemeProvider } from 'next-themes';
import React, { ReactNode } from 'react';

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider enableSystem={true} >{children}</ThemeProvider>;
};
