/** @format */

import React, { ReactNode } from 'react';
import '../styles/globals.css';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	display: 'swap',
});

export const metadata = {
	title: 'QwkCV',
	description: 'Easily create a digital CV in seconds.',
	meta: {
		viewport: 'width=device-width, initial-scale=1',
		charset: 'utf-8',
	},
};

export default async function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				{process.env.NODE_ENV === 'production' && (
					<>
						<Analytics />
					</>
				)}
			</head>
			<body
				className={`${poppins.className} bg-background text-foreground h-[calc(100dvh)] w-full antialiased`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
