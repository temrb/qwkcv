import { NextResponse, NextRequest } from 'next/server';
import base64url from 'base64url';
import { UserFormInput } from '@/types/user';

export async function POST(request: NextRequest, response: NextResponse) {
	const body = await request.json();
	const data = {
		...body,
	} as UserFormInput;

	const encodedData = base64url.encode(JSON.stringify(data));
	try {
		return NextResponse.json({
			status: 200,
			data: encodedData,
		});
	} catch (error: any) {
		return NextResponse.json({
			status: 500,
			data: error,
		});
	}
}
