import './globals.css';
import type { ReactNode } from 'react';
import { Josefin_Sans } from 'next/font/google'
import CustomCursor from './components/cursor/CustomCursor';

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Giorgi's Portfolio",
  description: "Check out my web development projects.",
  openGraph: {
    title: "Giorgi's Portfolio",
    description: "Check out my web development projects.",
    url: 'https://georgetsn29.github.io/Portfolio/',
    siteName: "Giorgi's Portfolio",
    images: [
      {
        url: 'https://georgetsn29.github.io/Portfolio/public/img/lo.png', // Must be an absolute URL
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Giorgi's Portfolio",
    description: "Check out my web development projects.",
    images: ['https://georgetsn29.github.io/Portfolio/public/img/lo.png'], 
  },
}


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