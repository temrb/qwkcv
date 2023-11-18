import { NextResponse, NextRequest } from 'next/server';
import base64url from 'base64url';
import { UserFormInput } from '@/types/user';

async function createShortenedLink(data: UserFormInput) {
	const encodedLink = base64url.encode(JSON.stringify(data));
	const domain = 'links.qwkcv.com';
	const currentDate = new Date();
	const expirationDate = new Date(currentDate.getTime() + 10 * 60 * 1000); // 10 minutes from now
	const expirationTimestamp = expirationDate.toISOString().slice(0, -5) + 'Z';
	const url =
		process.env.NODE_ENV === 'development'
			? `http://localhost:4242/cv/${encodedLink}`
			: `https://qwkcv.com/cv/${encodedLink}`;

	return {
		domain,
		url,
		expiresAt: expirationTimestamp,
	};
}

export async function POST(request: NextRequest, response: NextResponse) {
	try {
		const body = await request.json();
		const headers = request.headers;
		const data = { ...body } as UserFormInput;
		const linkData = await createShortenedLink(data);

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: headers.get('Authorization') || '',
			},
			body: JSON.stringify(linkData),
		};

		const apiResponse = await fetch(
			`https://api.dub.co/links?projectSlug=${process.env.DUB_SLUG}`,
			options as RequestInit,
		);

		const responseData = await apiResponse.json();

		if (!apiResponse.ok) {
			return NextResponse.json({
				status: apiResponse.status,
				data: responseData,
			});
		}

		if ('key' in responseData) {
			const dubLink = `https://links.qwkcv.com/${responseData.key}`;

			return NextResponse.json({
				status: 200,
				link: dubLink,
			});
		} else {
			return NextResponse.json({
				status: 500,
				data: 'Response does not contain a key property',
			});
		}
	} catch (error: any) {
		return NextResponse.json({
			status: 500,
			data: error,
		});
	}
}
