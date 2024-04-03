'use client';

import { Prisma } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserReservationItem from './_components/userReservationItem';
import Button from '../_components/button';
import Link from 'next/link';

const MyTrips = () => {
	const [reservations, setReservations] = useState<
		Prisma.TripReservationGetPayload<{
			include: { trip: true };
		}>[]
	>([]);

	const { status, data } = useSession();

	const router = useRouter();

	const fetchReservations = async () => {
		const response = await fetch(`http://localhost:3000/api/user/${(data?.user as any)?.id}/reservations`);
		const json = await response.json();

		setReservations(json);
	};

	useEffect(() => {
		if (status === 'unauthenticated') {
			return router.push('/');
		}

		fetchReservations();
	}, [status]);

	return (
		<section className='container mx-auto p-5'>
			<h1 className='text-primaryDarker text-xl font-semibold'>Minhas Viagens</h1>

			{reservations.length === 0 ? (
				<div className='flex flex-col'>
					<p className='text-primaryDarker text-xl font-medium mt-3'>
						Você ainda não reservou nenhuma viagem!
					</p>

					<Link href='/'>
						<Button className='mt-3 w-full'>Fazer reserva</Button>
					</Link>
				</div>
			) : (
				reservations.map(reservation => (
					<UserReservationItem
						key={reservation.id}
						reservation={reservation}
						fetchReservation={() => setReservations([])}
					/>
				))
			)}
		</section>
	);
};

export default MyTrips;
