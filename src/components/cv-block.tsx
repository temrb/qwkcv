'use client';

import React, { useState } from 'react';
import { Block } from '@/types/user';
import {
	ChevronDown,
	ChevronUp,
	Linkedin,
	Link as LinkIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ReferenceBlock = (referenceBlock: Block['referenceBlock']) => {
	const [showBlock, setShowBlock] = useState(false);
	const referencesArray = Object.values(referenceBlock || {});

	return (
		<div className='flex h-full w-full flex-col'>
			<button
				className={`select-button h-16 w-full items-center justify-center rounded-2xl
			${showBlock ? 'select-button-active rounded-b-none' : 'select-button-hover'}`}
				onClick={() => setShowBlock(!showBlock)}
			>
				<span className='flex flex-row items-center justify-between space-x-2 px-4'>
					<p className='font-normal tracking-widest'>References</p>
					{showBlock ? (
						<ChevronDown className='h-5 w-5' />
					) : (
						<ChevronUp className='h-5 w-5' />
					)}
				</span>
			</button>
			{showBlock && (
				<motion.div
					className='flex h-full w-full transform flex-col space-y-4 divide-y-2 divide-bgAccentLight
					rounded-2xl rounded-t-none border-t-2 border-dotted
					border-bgAccentLight border-b-bgAccentLight bg-bgAccentDark p-4 text-bgAccentLight shadow-md
					dark:divide-bgAccentDark dark:border-bgAccentDark dark:border-b-bgAccentDark dark:bg-bgAccentLight
					dark:text-bgAccentDark dark:shadow-none'
					initial={{ opacity: 0, y: -50 }}
					animate={{
						opacity: 1,
						y: 0,
						transition: {
							ease: 'easeInOut',
							duration: 0.6,
							type: 'spring',
							stiffness: 300,
							damping: 40,
							opacity: {
								delay: 0.125,
								duration: 0.25,
							},
						},
					}}
				>
					{referencesArray?.map((ref, i) => (
						<div
							className='flex h-full w-full flex-col space-y-2 p-4'
							key={i}
						>
							<div className='flex w-full flex-row items-center justify-between'>
								<h1 className='truncate pr-8 text-lg font-semibold tracking-tight lg:text-xl'>
									{ref?.name}
								</h1>
								{ref?.linkedin && (
									<Link
										href={`${ref?.linkedin}`}
										target='_blank'
										className='text-bgAccentLight dark:text-bgAccentDark'
									>
										<Linkedin className='h-5 w-5' />
									</Link>
								)}
							</div>
							<div className='flex w-full flex-row items-center justify-between'>
								<p className='pr-8 text-xs italic tracking-wider'>
									{ref?.company} / {ref?.relationship}
								</p>
								{ref?.link && (
									<Link
										href={`${ref?.link}`}
										target='_blank'
										className='text-bgAccentLight dark:text-bgAccentDark'
									>
										<LinkIcon className='h-5 w-5' />
									</Link>
								)}
							</div>
						</div>
					))}
				</motion.div>
			)}
		</div>
	);
};

const LinkBlock = (linkBlock: Block['linkBlock']) => {
	const [showBlock, setShowBlock] = useState(false);
	const linksArray = Object.values(linkBlock || {});

	return (
		<div className='flex h-full w-full flex-col'>
			<button
				className={`select-button h-16 w-full items-center justify-center rounded-2xl
			${showBlock ? 'select-button-active rounded-b-none' : 'select-button-hover'}`}
				onClick={() => setShowBlock(!showBlock)}
			>
				<span className='flex flex-row items-center justify-between space-x-2 px-4'>
					<p className='font-normal tracking-widest'>Links</p>
					{showBlock ? (
						<ChevronDown className='h-5 w-5' />
					) : (
						<ChevronUp className='h-5 w-5' />
					)}
				</span>
			</button>
			{showBlock && (
				<motion.div
					className='flex h-full w-full transform flex-col space-y-4 divide-y-2 divide-bgAccentLight
					rounded-2xl rounded-t-none border-t-2 border-dotted
					border-bgAccentLight border-b-bgAccentLight bg-bgAccentDark p-4 text-bgAccentLight shadow-md
					dark:divide-bgAccentDark dark:border-bgAccentDark dark:border-b-bgAccentDark dark:bg-bgAccentLight
					dark:text-bgAccentDark dark:shadow-none'
					initial={{ opacity: 0, y: -50 }}
					animate={{
						opacity: 1,
						y: 0,
						transition: {
							ease: 'easeInOut',
							duration: 0.6,
							type: 'spring',
							stiffness: 300,
							damping: 40,
							opacity: {
								delay: 0.125,
								duration: 0.25,
							},
						},
					}}
				>
					{linksArray?.map((link, i) => (
						<div
							className='flex h-full w-full flex-col space-y-2 p-4'
							key={i}
						>
							<div className='flex w-full flex-row items-center justify-between'>
								<h1 className='truncate pr-8 text-lg font-semibold tracking-tight lg:text-xl'>
									{link?.name}
								</h1>
								{link?.link && (
									<Link
										href={`${link?.link}`}
										target='_blank'
										className='text-bgAccentLight dark:text-bgAccentDark'
									>
										<LinkIcon className='h-5 w-5' />
									</Link>
								)}
							</div>
						</div>
					))}
				</motion.div>
			)}
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
