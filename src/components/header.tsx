/** @format */
'use client';

import React from 'react';
import { Github } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
	return (
		<header
			className='sticky top-0 z-20 flex
			h-20 w-full flex-row items-center
			 space-y-2 border-b-2 border-bgAccentDark bg-bgAccentLight/20
			 px-4 backdrop-blur-sm backdrop-hue-rotate-180 dark:border-bgAccentLight dark:bg-bgAccentDark/20'
		>
			<div className='inset-x-0 flex w-full flex-row items-center justify-between'>
				<Link
					href={'/'}
					className='header-item h-fit w-fit rounded-xl
					 bg-bgAccentLight px-3 py-2 text-indigo-600 dark:bg-bgAccentDark dark:text-indigo-400'
				>
					<p
						className='text-md inline-flex flex-col items-start justify-start font-semibold
								tracking-tight transition duration-300 ease-in-out'
					>
						QwkCV
					</p>
				</Link>

				<Link
					href={'https://github.com/temrb/qwkcv'}
					target='_blank'
					className={
						'header-item rounded-xl bg-bgAccentLight px-3 py-2 dark:bg-bgAccentDark'
					}
				>
					<Github className='h-5 w-5' />
				</Link>
			</div>
		</header>
	);
};

export default Header;
