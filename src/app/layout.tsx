/** @format */

import React, { ReactNode } from 'react';
import '../styles/globals.css';
import { Poppins } from 'next/font/google';

import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import Header from '@/components/header';
import { AlertProvider } from '@/context/AlertsContext';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
	title: 'Title',
	description: 'Description',
	meta: {
		viewport: 'width=device-width, initial-scale=1',
		charset: 'utf-8',
	},
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<head>
				{process.env.NODE_ENV === 'production' && (
					<>{/* analytics */}</>
				)}
			</head>
			<body
				className={`${poppins.className} h-[calc(100dvh)]  bg-bgAccentLight text-bgAccentDark dark:bg-bgAccentDark dark:text-bgAccentLight`}
			>
				<Header />
				<section className='bg-bgAccentLight dark:bg-bgAccentDark'>
					<div className='px-4 pb-24 md:pb-20'>
						<AlertProvider>{children}</AlertProvider>
					</div>
				</section>
				{process.env.NODE_ENV === 'production' && <Analytics />}
			</body>
		</html>
	);
}
