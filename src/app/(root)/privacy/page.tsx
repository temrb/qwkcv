import React from 'react';

const Page = () => {
	return (
		<div className='mx-auto h-full max-w-3xl flex-col items-center justify-center p-2'>
			<div className='mb-4 p-2'>
				<h1 className='mb-4 text-3xl font-semibold'>Privacy Policy</h1>
				<p className='mb-4'>
					Welcome to qwkcv.com! This tool is designed to help you
					organize your career-related items such as resumes, LinkedIn
					profiles, references, and more.
				</p>
				<p className='mb-4'>
					The tool operates on a unique principle where all CV-related
					data is stored in the URL&apos;s query parameter. You can
					reload your data by simply copying and pasting the URL back
					into qwkcv.
				</p>
				<p className='mb-4'>
					Please note that on the CV creation page (qwkcv.com), we may
					serve ads using Google AdSense to support our services and
					keep them free of charge. However, we do not display ads on
					the CV pages themselves (qwkcv.com/cv/*).
				</p>

				{/* Add information about dub.sh link shortening */}
				<p className='mb-4'>
					We also use dub.sh for link shortening. Please be aware that
					any shortened dub links created on qwkcv will automatically
					expire after 10 minutes. You can review the dub.sh privacy
					policy for more information on their data handling practices{' '}
					<a
						className='text-blue-500 hover:underline'
						href='https://dub.co/privacy'
						target='_blank'
						rel='noopener noreferrer'
					>
						here
					</a>
					.
				</p>

				<p>
					If you have any questions or concerns about our privacy
					policy, please feel free to contact us through our contact
					page at{' '}
					<a
						className='text-blue-500 hover:underline'
						href='https://temurb.vercel.app/contact'
					>
						https://temurb.vercel.app/contact
					</a>
					.
				</p>
			</div>
		</div>
	);
};

export default Page;
