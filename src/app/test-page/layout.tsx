/** @format */
'use client';

import React from 'react';

import { Alert } from '@/components/alerts';
import { useAlertContext } from '@/context/AlertsContext';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { alerts, removeAlert } = useAlertContext();

	return (
		<div className='h-full'>
			{children}
			<div className='stacked-alerts'>
				{alerts.map((alert: any, index: any) => (
					<Alert
						key={alert.id}
						type={alert.type}
						message={alert.message}
						onClose={() => removeAlert(alert.id)}
						style={{ bottom: `${index * 80}px` }}
					/>
				))}
			</div>
		</div>
	);
};

export default Layout;
