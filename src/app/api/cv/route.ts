import { NextResponse, NextRequest } from 'next/server';
import base64url from 'base64url';
import { UserFormInput } from '@/types/user';

export async function POST(request: NextRequest, response: NextResponse) {
	const body = await request.json();
	const data = {
		...body,
	} as UserFormInput;
	const encodedLink = base64url.encode(JSON.stringify(data));

	const url = `${
		process.env.NODE_ENV === 'development'
			? 'http://localhost:4242'
			: 'https://qwkcv.com'
	}/cv/${encodedLink}`;

	const expirationDate = new Date(600000).getTime(); /* 10 minutes from now */

	const options = {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + process.env.DUB_API_KEY,
			'Content-Type': 'application/json',
		},
		body:
			'{"domain":"qwkcv.com","url" : "' +
			url +
			'","expiresAt":' +
			expirationDate +
			'}',
	};

	try {
		const response = await fetch(
			'https://api.dub.co/links?projectSlug=qwkcv',
			options,
		)
			.then((response) => response.json())
			.then((response) => console.log(response))
			.catch((err) => console.error(err));

		return NextResponse.json({
			status: 200,
			link: response,
		});
	} catch (error: any) {
		return NextResponse.json({
			status: 500,
			data: error,
		});
	}
}
