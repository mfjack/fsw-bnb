'use client';

import { TripReservation } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyTrips = () => {
	const [reservation, setReservation] = useState<TripReservation[]>([]);

	const { status, data } = useSession();

	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated' || !data?.user) {
			return router.push('/');
		}

		const fetchReservations = async () => {
			const response = await fetch(
				`http://localhost:3000/api/user/${(data?.user as any).id}/reservations`
			);
			const json = await response.json();

			setReservation(json);
		};

		fetchReservations();
	}, [status]);

	return (
		<section className='container mx-auto p-5'>
			<h1 className='text-primaryDarker font-semibold text-xl'>Minhas Viagens</h1>

			<div className='flex border p-5 border-solid border-grayLighter w-full mt-5'>
				<Image
					src='/divider.svg'
					alt='Divisor'
					width={48}
					height={48}
				/>

				<div>
					<h2>Hotel Maravista</h2>
					<p>Maravista, RJ</p>
				</div>
			</div>
		</section>
	);
};

export default MyTrips;
