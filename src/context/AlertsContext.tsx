/** @format */
'use client';

import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

export interface Alert {
	id: string;
	type: AlertType;
	message: string;
}

interface AlertContextType {
	alerts: Alert[];
	addAlert: (type: AlertType, message: string) => void;
	removeAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlertContext = () => {
	const context = useContext(AlertContext);
	if (!context) {
		throw new Error('useAlertContext must be used within an AlertProvider');
	}
	return context;
};

interface AlertProviderProps {
	children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
	const [alerts, setAlerts] = useState<Alert[]>([]);

	const addAlert = (type: AlertType, message: string) => {
		const newAlert: Alert = {
			id: uuidv4(),
			type: type,
			message: message,
		};
		setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
	};

	const removeAlert = (id: string) => {
		setAlerts((prevAlerts) =>
			prevAlerts.filter((alert) => alert.id !== id),
		);
	};

	useEffect(() => {
		if (alerts.length > 0) {
			const timer = setTimeout(() => {
				const alertIdToRemove = alerts[0].id;
				removeAlert(alertIdToRemove);
			}, 7000);
			return () => clearTimeout(timer);
		}
	}, [alerts]);

	return (
		<AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
			{children}
		</AlertContext.Provider>
	);
};
