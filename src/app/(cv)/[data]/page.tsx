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

type Props = {
	params: {
		data: string;
	};
};

function decodeData(data: string) {
	try {
		const decodedData = atob(data);
		const jsonData = JSON.parse(decodedData) as UserFormInput;
		console.log('Decoded JSON Data:', jsonData);
		return jsonData;
	} catch (error) {
		console.error('Error parsing JSON:', error);
		return null;
	}
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const data = params.data;
	const jsonData = decodeData(data);

	return {
		title: `${jsonData?.name}`,
		description: `${
			jsonData?.blurb || 'qwkcv | Create a digital CV in seconds'
		}`,
	};
}

const Page = async ({ params }: Props) => {
	const data = params.data;
	const jsonData = decodeData(data);

	console.log('🚀 ~ file: page.tsx:39 ~ Page ~ data:', data);

	if (jsonData) {
		return <div>{/* Your component content */}</div>;
	} else {
		return <div>Error: Invalid JSON data</div>;
	}
};

export default Page;
