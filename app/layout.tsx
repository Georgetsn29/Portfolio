import './globals.css';
import type { ReactNode } from 'react';
import { Josefin_Sans } from 'next/font/google'
import CustomCursor from './components/cursor/CustomCursor';

export const metadata = {
  title: "Giorgi's Portfolio",
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
        <link rel="icon" href="img/lo.png" />
      </head>
      <body>
		<CustomCursor />
        <div id="particle-container">
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
	<div className="particle"></div>
</div>
        <main>{children}</main>
      </body>

    </html>
  );
}