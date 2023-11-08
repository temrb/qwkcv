/** @format */
'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import internalLinks from '@/data/links/internal-links';
import { Folder, FolderOpen, Mail, MailOpen } from 'lucide-react';

const Header = () => {
	const router = useRouter();
	const pathname = usePathname();
	return (
		<header
			className='sticky top-0 z-50 flex
			h-20 w-full flex-row items-center
			 space-y-2 border-b-2 border-bgAccentDark bg-bgAccentLight/90 px-4 backdrop-blur-md backdrop-filter dark:border-bgAccentLight dark:bg-bgAccentDark/90'
		>
			<div className='inset-x-0 flex w-full flex-row items-center justify-between'>
				<div className='flex'>
					<div className='flex items-center lg:space-x-2'>
						<button
							type='button'
							onClick={() => router.push(`${internalLinks.home}`)}
							className='header-item'
						>
							<p
								className='text-md flex flex-col items-start justify-start font-semibold
                                     transition duration-300 ease-in-out'
							>
								Title
							</p>
						</button>
					</div>
				</div>

				<div className='flex space-x-6 md:space-x-10 lg:space-x-12'>
					<button
						type='button'
						onClick={() => router.push(`${internalLinks.item1}`)}
						className={`header-item ${
							pathname === `${internalLinks.item1}`
								? 'text-indigo-700 opacity-100 dark:text-indigo-400'
								: 'opacity-60 transition duration-300 ease-in-out hover:opacity-100'
						}`}
					>
						<div className='flex items-center justify-center space-x-2'>
							{pathname === `${internalLinks.item1}` ? (
								<FolderOpen className='h-5 w-5 lg:h-6 lg:w-6' />
							) : (
								<Folder className='h-5 w-5 lg:h-6 lg:w-6' />
							)}
							<div className='hidden lg:inline-flex'>
								Test Page
							</div>
						</div>
					</button>
					<button
						type='button'
						onClick={() => router.push(`${internalLinks.item2}`)}
						className={`header-item cursor-pointer ${
							pathname === `${internalLinks.item2}`
								? ' text-indigo-700 opacity-100 dark:text-indigo-400'
								: 'opacity-60 transition duration-300 ease-in-out hover:opacity-100'
						}`}
					>
						<div className='flex items-center justify-center space-x-2'>
							{pathname === `${internalLinks.item2}` ? (
								<MailOpen className='h-5 w-5 lg:h-6 lg:w-6' />
							) : (
								<Mail className='h-5 w-5 lg:h-6 lg:w-6' />
							)}
							<div className='hidden lg:inline-flex'>Item2</div>
						</div>
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
