import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './_style/globals.css';
import { NextAuthProvider } from '@/providers/auth';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: 'Trip',
	description: 'Sistema de reservas de viagens, reserve sua hospedagem!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pt-BR'>
			<body className={poppins.className}>
				<NextAuthProvider>{children}</NextAuthProvider>
			</body>
		</html>
	);
}
