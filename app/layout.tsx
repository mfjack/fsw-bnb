import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './_style/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Trip',
	description: 'Reserve sua hospedagem!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pt-BR'>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
