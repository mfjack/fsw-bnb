import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'search-background': 'url(/worldmap.svg)',
			},
			colors: {
				primary: '#590BD8',
				primaryLighter: '#DDD5EA',
				primaryDarker: '#312A4F',
				grayPrimary: '#717171',
				grayLighter: '#BBBFBF',
				walterWhite: '#F5F5F5',
			},
			textColor: {
				dark: '#717171',
			},
		},
	},
	plugins: [],
};
export default config;
