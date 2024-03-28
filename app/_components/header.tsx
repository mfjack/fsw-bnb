'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

const Header = () => {
	const { status, data } = useSession();
	const [menuIsOpen, setMenuIsOpen] = useState(false);

	const handleLoginClick = () => {
		signIn();
	};

	const handleLogoutClick = () => {
		signOut();
	};

	const handleMenuClick = () => {
		setMenuIsOpen(!menuIsOpen);
	};

	return (
		<header className='container mx-auto p-5 py-0 h-20 flex justify-between items-center'>
			<Link href='/'>
				<Image
					src='/logo.svg'
					alt='Logotipo'
					width={32}
					height={32}
				/>
			</Link>

			{status === 'unauthenticated' && (
				<button
					className='text-primary text-sm font-semibold'
					onClick={handleLoginClick}
				>
					Login
				</button>
			)}

			{status === 'authenticated' && data.user && (
				<div className='flex items-center gap-3 border-grayLighter border border-solid rounded-full p-2 px-3 relative'>
					<AiOutlineMenu
						className='cursor-pointer'
						size={16}
						onClick={handleMenuClick}
					/>

					<Image
						className='rounded-full shadow-md'
						src={data.user.image!}
						alt={data.user.name!}
						width={35}
						height={35}
					/>

					{menuIsOpen && (
						<div className='absolute right-0 top-14 w-full h-full flex flex-col justify-center items-center bg-white border border-solid rounded-lg shadow-md p-2'>
							<button
								className='text-primary text-sm font-semibold'
								onClick={handleLogoutClick}
							>
								Logout
							</button>
						</div>
					)}
				</div>
			)}
		</header>
	);
};

export default Header;
