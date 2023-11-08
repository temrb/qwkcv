/** @format */

import LoadingSpinner from '@/components/loading-spinner';
import React from 'react';

const Loading = () => {
	return (
		<div className='flex h-full w-full items-center justify-center'>
			<LoadingSpinner size='h-16' />
		</div>
	);
};

export default Loading;
