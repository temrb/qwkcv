/** @format */

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'https://www.site.com/',
			lastModified: new Date(),
		},
		{
			url: 'https://www.site.com/policies/',
			lastModified: new Date(),
		},
	];
}
