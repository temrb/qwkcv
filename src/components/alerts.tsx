/** @format */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertCircle } from 'lucide-react';

export const Alert = ({
	type,
	message,
	onClose,
	style,
}: {
	type: string;
	message: string;
	onClose: () => void;
	style?: React.CSSProperties;
}) => {
	const [isVisible, setIsVisible] = useState(true);

	const typeColor = {
		success: 'bg-green-700 text-bgAccentLight',
		error: 'bg-red-700 text-bgAccentLight',
		info: 'bg-blue-700 text-bgAccentLight',
		warning: 'bg-yellow-700 text-bgAccentLight',
	};

	const typeIcon = {
		success: <CheckCircle size={20} />,
		error: <XCircle size={20} />,
		info: <Info size={20} />,
		warning: <AlertCircle size={20} />,
	};

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.button
					className={`${
						typeColor[type as keyof typeof typeColor]
					} fixed left-6 z-40 mb-28 flex 
					w-60 cursor-pointer flex-col space-y-2 rounded-lg px-3
					py-2 shadow-lg outline-none dark:shadow-none md:w-72`}
					style={style}
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 30 }}
					transition={{ duration: 0.37, ease: 'easeInOut' }}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => {
						setIsVisible(false);
						onClose();
					}}
				>
					<span className='flex w-full items-center space-x-3'>
						<p className='flex w-fit justify-end'>
							{typeIcon[type as keyof typeof typeIcon]}
						</p>
						<p className='items-start justify-start text-base font-semibold capitalize'>
							{type}
						</p>
					</span>
					<p className='flex w-full justify-start truncate text-ellipsis text-xs font-light'>
						{message}
					</p>
				</motion.button>
			)}
		</AnimatePresence>
	);
};
