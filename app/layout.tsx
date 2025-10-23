import './globals.css';
import type { ReactNode } from 'react';
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: 'Portfolio',
  description: '',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ka">
      <head>
        <link rel="icon" href="./img/Odot.png" />
      </head>
      <body>

        {/* <Sidebar /> */}

        <main>{children}</main>
      </body>

    </html>
  );
}