import { Inter } from 'next/font/google';

// Preload critical fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
});

export { inter };
