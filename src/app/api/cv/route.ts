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

	try {
		return NextResponse.json({
			status: 200,
			link: url,
		});
	} catch (error: any) {
		return NextResponse.json({
			status: 500,
			data: error,
		});
	}
}
