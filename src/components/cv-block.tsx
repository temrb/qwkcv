'use client';

import React from 'react';
import { Block } from '@/types/user';
import { Linkedin, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

const ReferenceBlock = (referenceBlock: Block['referenceBlock']) => {
	const referencesArray = Object.values(referenceBlock || {});

	return (
		<div className='divide-y-[1px]'>
			{referencesArray?.map((ref, i) => (
				<div
					className='flex h-full w-full flex-col space-y-3 py-4'
					key={i}
				>
					<h1 className='w-full truncate text-lg font-semibold tracking-tight'>
						{ref?.name}
					</h1>
					<p className='w-full truncate text-sm font-light tracking-tight'>
						{ref?.company} - {ref?.relationship}
					</p>
					<div className='flex flex-row items-center space-x-6'>
						{ref?.link && (
							<Link
								href={`${ref?.link}`}
								className='flex w-fit flex-row items-center space-x-1 decoration-2 hover:underline'
								target='_blank'
							>
								<LinkIcon className='h-4 w-4' />
								<p className='hidden text-sm tracking-wider lg:inline-flex'>
									Link to Reference
								</p>
							</Link>
						)}
						{ref?.linkedin && (
							<Link
								href={`${ref?.linkedin}`}
								className='flex w-fit flex-row items-center space-x-1 decoration-2 hover:underline'
								target='_blank'
							>
								<Linkedin className='h-4 w-4' />
								<p className='hidden text-sm tracking-wider lg:inline-flex'>
									LinkedIn
								</p>
							</Link>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

const LinkBlock = (linkBlock: Block['linkBlock']) => {
	const linksArray = Object.values(linkBlock || {});

	return (
		<div className='divide-y-[1px]'>
			{linksArray?.map((link, i) => (
				<div
					className='flex h-full w-full flex-col space-y-3 py-4'
					key={i}
				>
					<h1 className='w-full truncate text-lg font-semibold tracking-tight'>
						{link?.name}
					</h1>
					{link?.description && (
						<p className='w-full truncate text-sm font-light tracking-tight'>
							{link?.description}
						</p>
					)}
					{link?.link && (
						<div className='flex flex-row items-center space-x-6'>
							<Link
								href={`${link?.link}`}
								className='flex w-fit flex-row items-center space-x-1 decoration-2 hover:underline'
								target='_blank'
							>
								<LinkIcon className='h-4 w-4' />
								<p className='hidden text-sm tracking-wider lg:inline-flex'>
									Link
								</p>
							</Link>
						</div>
					)}
				</div>
			))}
		</div>
	);
};

const CVBlock = (props: Block) => {
	return (
		<>
			{props?.referenceBlock && (
				<ReferenceBlock {...props?.referenceBlock} />
			)}
			{props?.linkBlock && <LinkBlock {...props?.linkBlock} />}
		</>
	);
};

export default CVBlock;
