/** @format */
'use client';

import React from 'react';
import { useAlertContext } from '../../context/AlertsContext';

const TestRoot = () => {
	const { addAlert } = useAlertContext();
	return (
		<div className='flex flex-col space-y-4'>
			<span>TestRoot</span>
			<button
				className='primary-button w-fit'
				onClick={() => {
					addAlert('success', 'test alert');
				}}
			>
				test alert
			</button>
		</div>
	);
};

export default TestRoot;
