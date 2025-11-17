import './globals.css';
import type { ReactNode } from 'react';
import { Josefin_Sans } from 'next/font/google'

export const metadata = {
  title: 'Portfolio',
  description: '',
};

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '700'], 
  variable: '--font-josefin-sans', 
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ka">
      <head>
        <link rel="icon" href="img/odot.png" />
      </head>
      <body>

        {/* <Sidebar /> */}

        <main>{children}</main>
      </body>

    </html>
  );
}