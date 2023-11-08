import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import {
	Github,
	HeartHandshake,
	Link as LinkIcon,
	Linkedin,
	Mail,
	MapPin,
	User2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserFormInput } from '@/types/user';
import base64url from 'base64url';

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

	if (jsonData) {
		return (
			<div className='mx-auto h-full max-w-3xl flex-col items-center justify-center space-y-4 p-4'>
				<div className='flex flex-row items-center justify-between'>
					<Image
						src={`${jsonData?.photoURL}`}
						alt={`${jsonData?.name} avatar`}
						width={100}
						height={100}
						className='rounded-full'
					/>
				</div>
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
