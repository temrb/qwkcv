/** @format */

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://qwkcv.vercel.app/',
			lastModified: new Date(),
		},
		// {
		// 	url: 'https://qwkcv.vercel.app/policies/',
		// 	lastModified: new Date(),
		// },
	];
}
