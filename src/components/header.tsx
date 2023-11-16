/** @format */
'use client';

import React from 'react';
import { Github, ShieldHalf } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from './ui/mode-toggle';

const Header = () => {
	return (
		<header
			className='sticky top-0 z-20 flex
			h-20 w-full flex-row items-center
			 space-y-2 border-b-2 border-foreground/20 bg-background/20
			 px-4 backdrop-blur-sm backdrop-hue-rotate-180'
		>
			<div className='inset-x-0 flex w-full flex-row items-center justify-between'>
				<Link
					href={'/'}
					className='header-item h-fit w-fit rounded-xl bg-background px-3 py-2 text-primary'
				>
					<p
						className='text-md inline-flex flex-col items-start justify-start font-semibold
								tracking-tight transition duration-300 ease-in-out'
					>
						QwkCV
					</p>
				</Link>

				<div className='flex flex-row items-center space-x-4'>
					<ModeToggle />
					<Link
						href={'/privacy'}
						className={
							'header-item rounded-xl bg-background px-3 py-2'
						}
					>
						<ShieldHalf className='h-5 w-5' />
					</Link>
					<Link
						href={'https://github.com/temrb/qwkcv'}
						target='_blank'
						className={
							'header-item rounded-xl bg-background px-3 py-2'
						}
					>
						<Github className='h-5 w-5' />
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
