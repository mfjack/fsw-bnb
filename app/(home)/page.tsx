'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Home = () => {
	const { data } = useSession();

	return (
		<div>
			
		</div>
	);
};

export default Home;
