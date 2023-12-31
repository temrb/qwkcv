/** @format */

import React, { ReactNode } from 'react';
import Header from '@/components/header';
import Script from 'next/script';

export const metadata = {
	title: 'QwkCV | Create a digital CV in seconds',
	description: 'Description',
	meta: {
		viewport: 'width=device-width, initial-scale=1',
		charset: 'utf-8',
	},
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<div className='h-[calc(100dvh-5rem)] w-full'>
			<Header />
			<section className='h-full w-full p-4'>{children}</section>
			<Script
				async
				src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3017290823015478'
				crossOrigin='anonymous'
			/>
		</div>
	);
}
