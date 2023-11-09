/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				bgAccentLight: '#f0f0f0',
				bgAccentDark: '#191919',
				info: '#1a73e8',
				success: '#0f9d58',
				warning: '#f4b400',
				error: '#db4437',
			},
		},
	},
	future: {
		hoverOnlyWhenSupported: true,
		purgeLayersByDefault: true,
	},
	plugins: [],
};
