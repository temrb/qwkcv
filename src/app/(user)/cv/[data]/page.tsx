import React from 'react';
import type { Metadata } from 'next';
import {
	CalendarRange,
	FileText,
	Github,
	Link as LinkIcon,
	Linkedin,
	Mail,
	MapPin,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { UserFormInput } from '@/types/user';
import base64url from 'base64url';
import Script from 'next/script';
import CVBlock from '@/components/cv-block';

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

const Page = async ({ params }: Props) => {
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
			<div className='mx-auto h-full max-w-3xl flex-col items-center justify-center space-y-4 p-4'>
				<div className='flex h-fit flex-col items-start justify-start space-y-2 capitalize'>
					{(jsonData?.photoURL || jsonData?.blurb) && (
						<div className='flex h-full w-full flex-row items-center space-x-4'>
							<div className='relative h-16 w-20'>
								<Image
									src={`${jsonData?.photoURL}`}
									alt={`${jsonData?.name} avatar`}
									quality={50}
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

							{jsonData?.blurb && (
								<p className='h-20 w-full overflow-x-hidden overflow-y-scroll text-xs font-light tracking-wide'>
									{jsonData?.blurb}
								</p>
							)}
						</div>
					)}
					<div className='flex h-full w-full flex-col space-y-4 pb-6'>
						<div className='flex h-full w-full flex-col items-start space-y-2 lg:flex-row lg:items-center lg:justify-between lg:space-x-4 lg:space-y-0'>
							<h1 className='flex-1 truncate text-xl font-semibold tracking-tight lg:w-2/5 lg:text-2xl'>
								{jsonData?.name}
							</h1>
							<div className='flex w-full flex-row space-x-2 lg:w-3/5'>
								<span className='flex w-1/3 items-center space-x-1'>
									<MapPin className='h-4 w-4' />
									<p className=' w-full truncate text-xs tracking-wider lg:text-sm'>
										{jsonData?.location}
									</p>
								</span>
								{(jsonData?.options?.openToRelocation ||
									jsonData?.options?.openToRemote) && (
									<span className='flex w-2/3 items-center justify-end space-x-1'>
										<p className='text-xs italic tracking-wider lg:text-sm'>
											Open to/
										</p>
										{jsonData?.options
											?.openToRelocation && (
											<p className='p-1 text-xs font-semibold tracking-tight text-blue-800 dark:text-blue-400 lg:text-sm'>
												Relocation
											</p>
										)}

										{jsonData?.options?.openToRemote && (
											<p className='p-1 text-xs font-semibold tracking-tight text-blue-800 dark:text-blue-400 lg:text-sm'>
												Remote
											</p>
										)}
									</span>
								)}
							</div>
						</div>
						<div className='flex w-full flex-row space-x-4 border-t-2 border-bgAccentDark/20 pt-4 dark:border-bgAccentLight/20'>
							{jsonData?.email && (
								<Link
									href={`mailto:${jsonData?.email}`}
									className='button flex w-fit flex-row items-center space-x-2'
								>
									<Mail className='h-5 w-5' />
									<p className='hidden text-sm tracking-wider lg:inline-flex'>
										Email
									</p>
								</Link>
							)}
							{jsonData?.resumeURL && (
								<Link
									href={`${jsonData?.resumeURL}`}
									className='button flex w-fit flex-row items-center space-x-2'
									target='_blank'
								>
									<FileText className='h-5 w-5' />
									<p className='hidden text-sm tracking-wider lg:inline-flex'>
										Resume
									</p>
								</Link>
							)}
							{jsonData?.linkedin && (
								<Link
									href={`${jsonData?.linkedin}`}
									className='button flex w-fit flex-row items-center space-x-2'
									target='_blank'
								>
									<Linkedin className='h-5 w-5' />
									<p className='hidden text-sm tracking-wider lg:inline-flex'>
										LinkedIn
									</p>
								</Link>
							)}
							{jsonData?.calendly && (
								<Link
									href={`${jsonData?.calendly}`}
									className='button flex w-fit flex-row items-center space-x-2'
									target='_blank'
								>
									<CalendarRange className='h-5 w-5' />
									<p className='hidden text-sm tracking-wider lg:inline-flex'>
										Calendly
									</p>
								</Link>
							)}
							{jsonData?.github && (
								<Link
									href={`${jsonData?.github}`}
									className='button flex w-fit flex-row items-center space-x-2'
									target='_blank'
								>
									<Github className='h-5 w-5' />
									<p className='hidden text-sm tracking-wider lg:inline-flex'>
										Github
									</p>
								</Link>
							)}
							{jsonData?.website && (
								<Link
									href={`${jsonData?.website}`}
									className='button flex w-fit flex-row items-center space-x-2'
									target='_blank'
								>
									<LinkIcon className='h-5 w-5' />
									<p className='hidden text-sm tracking-wider lg:inline-flex'>
										Website
									</p>
								</Link>
							)}
						</div>
						<div className='flex h-full w-full flex-col space-y-6 pt-6'>
							{jsonData?.block?.referenceBlock?.length !== 0 && (
								<CVBlock
									referenceBlock={
										jsonData?.block?.referenceBlock
									}
								/>
							)}
							{jsonData?.block?.linkBlock?.length !== 0 && (
								<CVBlock
									linkBlock={jsonData?.block?.linkBlock}
								/>
							)}
						</div>
						{vimeoVideoId && (
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
						)}

						{jsonData?.assets?.photoURL && (
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
								className='justify-center rounded-2xl shadow-md dark:shadow-none'
							/>
						)}
					</div>
				</div>
				<Script src='https://player.vimeo.com/api/player.js' async />
			</div>
		);
	} else {
		return (
			<div className='flex h-full w-full flex-col items-center justify-center space-y-2 p-4'>
				<p>Oops! Something went wrong.</p>
				<Link href='/' className='button'>
					Go back
				</Link>
			</div>
		);
	}
};

export default Page;
