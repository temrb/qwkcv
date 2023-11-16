import React from 'react';
import type { Metadata } from 'next';
import {
	ArrowUpRightSquare,
	CalendarRange,
	FileText,
	Github,
	Link as LinkIcon,
	Linkedin,
	Mail,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { UserFormInput } from '@/types/user';
import base64url from 'base64url';
import Script from 'next/script';
import CVBlock from '@/components/cv-block';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

type Props = {
	params: {
		data: string;
	};
};

function decodeData(data: string): UserFormInput | null {
	try {
		const decodedData = JSON.parse(base64url.decode(data)) as UserFormInput;
		return decodedData;
	} catch (error) {
		console.error('Error decoding or parsing JSON:', error);
		return null;
	}
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const data = params.data;
	const jsonData = decodeData(data);

	return {
		title: `${jsonData?.name || 'QwkCV'}`,
		description: `${
			jsonData?.blurb || 'QwkCV | Create a digital CV in seconds'
		}`,
	};
}

const Page = ({ params }: Props) => {
	const data = params.data;
	const jsonData = decodeData(data);

	function getVimeoVideoId(vimeoURL: string): string | null {
		const regex = /(?:vimeo\.com\/(?:video\/)?)?(\d+)/;
		const match = vimeoURL.match(regex);

		return match ? match[1] : null;
	}

	const vimeoVideoId = getVimeoVideoId(jsonData?.assets?.vimeoURL || '');

	if (jsonData) {
		return (
			<div className='mx-auto h-full max-w-3xl flex-col items-center justify-center space-y-8 p-4'>
				<div className='flex h-fit flex-col items-start justify-start space-y-2 capitalize'>
					<div className='flex h-full w-full flex-row items-center justify-between space-x-4'>
						{jsonData?.photoURL && (
							<div className='relative h-16 w-20'>
								<Image
									src={`${jsonData?.photoURL}`}
									alt={`${jsonData?.name} avatar`}
									quality={35}
									fill
									style={{
										objectFit: 'cover',
										objectPosition: 'center',
										borderRadius: '0.5rem',
									}}
									sizes='(min-width: 1024px) 100px,
										(min-width: 768px) 75px,
										50px'
									loading='lazy'
								/>
							</div>
						)}
						<div className='flex w-full flex-col truncate'>
							<h1 className='w-full truncate text-2xl font-semibold tracking-tighter lg:text-3xl'>
								{jsonData?.name}
							</h1>
							<p className='flex w-full items-center truncate text-xs tracking-tight lg:text-sm'>
								📍{jsonData?.location}
							</p>
						</div>
					</div>

					{jsonData?.blurb && (
						<p className='h-20 w-full overflow-x-hidden overflow-y-scroll pt-2 text-xs font-light normal-case tracking-widest'>
							{jsonData?.blurb}
						</p>
					)}

					<div className='flex h-full w-full flex-col space-y-6 pb-6 pt-2'>
						<div className='flex w-full flex-row space-x-6 border-t-[1px] border-foreground/20 pt-4'>
							{jsonData?.email && (
								<Link
									href={`mailto:${jsonData?.email}`}
									className='flex w-fit flex-row items-center space-x-1 decoration-2 hover:underline'
								>
									<Mail className='h-4 w-4' />
									<p className='hidden text-sm tracking-wider lg:inline-flex'>
										Email
									</p>
								</Link>
							)}
							{jsonData?.resumeURL && (
								<Link
									href={`${jsonData?.resumeURL}`}
									className='flex w-fit flex-row items-center space-x-1 decoration-2 hover:underline'
									target='_blank'
								>
									<FileText className='h-4 w-4' />
									<p className='hidden text-sm tracking-wider lg:inline-flex'>
										Resume
									</p>
								</Link>
							)}
							{jsonData?.linkedin && (
								<Link
									href={`${jsonData?.linkedin}`}
									className='flex w-fit flex-row items-center space-x-1 decoration-2 hover:underline'
									target='_blank'
								>
									<Linkedin className='h-4 w-4' />
									<p className='hidden text-sm tracking-wider lg:inline-flex'>
										LinkedIn
									</p>
								</Link>
							)}
							{jsonData?.calendly && (
								<Link
									href={`${jsonData?.calendly}`}
									className='flex w-fit flex-row items-center space-x-1 decoration-2 hover:underline'
									target='_blank'
								>
									<CalendarRange className='h-4 w-4' />
									<p className='hidden text-sm tracking-wider lg:inline-flex'>
										Calendly
									</p>
								</Link>
							)}
							{jsonData?.github && (
								<Link
									href={`${jsonData?.github}`}
									className='flex w-fit flex-row items-center space-x-1 decoration-2 hover:underline'
									target='_blank'
								>
									<Github className='h-4 w-4' />
									<p className='hidden text-sm tracking-wider lg:inline-flex'>
										Github
									</p>
								</Link>
							)}
							{jsonData?.website && (
								<Link
									href={`${jsonData?.website}`}
									className='flex w-fit flex-row items-center space-x-1 decoration-2 hover:underline'
									target='_blank'
								>
									<LinkIcon className='h-4 w-4' />
									<p className='hidden text-sm tracking-wider lg:inline-flex'>
										Website
									</p>
								</Link>
							)}
						</div>

						<Accordion type='single' collapsible>
							{jsonData?.block?.referenceBlock && (
								<AccordionItem value='item-1'>
									<AccordionTrigger>
										References
									</AccordionTrigger>
									<AccordionContent>
										<CVBlock
											referenceBlock={
												jsonData?.block?.referenceBlock
											}
										/>
									</AccordionContent>
								</AccordionItem>
							)}
							{jsonData?.block?.linkBlock && (
								<AccordionItem value='item-2'>
									<AccordionTrigger>Links</AccordionTrigger>
									<AccordionContent>
										<CVBlock
											linkBlock={
												jsonData?.block?.linkBlock
											}
										/>
									</AccordionContent>
								</AccordionItem>
							)}
							{jsonData?.assets?.photoURL && (
								<AccordionItem value='item-3'>
									<AccordionTrigger>Image</AccordionTrigger>
									<AccordionContent>
										<Image
											src={`${jsonData?.assets?.photoURL}`}
											alt={`${jsonData?.name} photo asset`}
											sizes='100vw'
											loading='lazy'
											quality={50}
											style={{
												width: '100%',
												height: 'auto',
											}}
											width={500}
											height={500}
										/>
									</AccordionContent>
								</AccordionItem>
							)}
							{vimeoVideoId && (
								<AccordionItem value='item-4'>
									<AccordionTrigger>Video</AccordionTrigger>
									<AccordionContent>
										<div
											style={{
												padding: '56.25% 0 0 0',
												position: 'relative',
											}}
										>
											<iframe
												src={`https://player.vimeo.com/video/${vimeoVideoId}`}
												style={{
													position: 'absolute',
													top: '0',
													left: '0',
													width: '100%',
													height: '100%',
												}}
												allow='autoplay; fullscreen; picture-in-picture'
											></iframe>
										</div>
									</AccordionContent>
								</AccordionItem>
							)}
						</Accordion>
						{vimeoVideoId && (
							<Script
								src='https://player.vimeo.com/api/player.js'
								async
							/>
						)}
					</div>
				</div>
				<div className='bottom-0 flex h-14 w-full items-center justify-end bg-background'>
					<Link
						className='w-fit underline-offset-4 hover:underline'
						href='/'
						target='_blank'
					>
						<span className='flex h-full w-full flex-row items-center justify-center space-x-2'>
							<p className='text-xs font-light'>Create a QwkCV</p>
							<ArrowUpRightSquare
								size={14}
								className='text-foreground/80'
							/>
						</span>
					</Link>
				</div>
			</div>
		);
	} else {
		return (
			<div className='flex h-full w-full flex-col items-center justify-center space-y-2 p-4'>
				<p>Oops! Something went wrong.</p>
				<Link href='/'>Go back</Link>
			</div>
		);
	}
};

export default Page;
