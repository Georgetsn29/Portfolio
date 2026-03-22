import './globals.css';
import type { ReactNode } from 'react';
import { Josefin_Sans } from 'next/font/google'
import CustomCursor from './components/cursor/CustomCursor';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Giorgi's Portfolio",
  description: "Check out my work and projects.",
  // 1. Set metadataBase so Next.js can calculate absolute image paths
  metadataBase: new URL('https://georgetsn29.github.io'),
  openGraph: {
    title: "Giorgi's Portfolio",
    description: "Check out my work and projects.",
    url: 'https://georgetsn29.github.io/Portfolio/',
    siteName: "Giorgi's Portfolio",
    images: [
      {
        url: '/public/img/lo.png', // path to your logo (placed in your public/ folder)
        width: 1200,
        height: 630,
        alt: 'Giorgi Portfolio Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Giorgi's Portfolio",
    description: "Check out my work and projects.",
    images: ['/public/img/lo.png'], // falls back to metadataBase
  },
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