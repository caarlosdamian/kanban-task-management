'use client';
import React, { ReactNode } from 'react';
import { store } from '@/redux/store';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider enableSystem={true}>{children}</ThemeProvider>
    </Provider>
  );
};
