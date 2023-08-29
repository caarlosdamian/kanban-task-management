'use client';
import { ThemeProvider } from 'next-themes';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function Home() {
  const {theme} = useTheme();
  console.log('===ThemeContextProvider==',theme)
  return (
    <main className="bg-content min-w-screen min-h-screen">
      <h1 className="text-secondary">Hello</h1>
    </main>
  );
}
