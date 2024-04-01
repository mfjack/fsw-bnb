'use client';

import { Trip } from '@prisma/client';
import { format } from 'date-fns';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { ptBR } from 'date-fns/locale/pt-BR';
import Button from '@/app/_components/button';

const TripConfirmation = ({ params }: { params: { tripId: string } }) => {
	// const [trip, setTrip] = useState<Trip | null>();
	// const [ totalPrice, setTotalPrice ] = useState<number>(0);

	const searchParams = useSearchParams();

	// useEffect(() => {
	// 	const fetchTrip = async () => {
	// 		const response = await fetch(`/api/trips/check`, {
	// 			method: 'POST',
	// 			body: JSON.stringify({
	// 				tripId: params.tripId,
	// 				startDate: searchParams.get('startDate'),
	// 				endDate: searchParams.get('endDate'),
	// 			}),
	// 		});

	// 		const { trip, totalPrice } = await response.json();

	// 		setTrip(trip);
	// 		setTotalPrice(totalPrice);
	// 	};

	// 	fetchTrip();
	// }, []);

	// if (!trip) return null;

	const startDate = new Date(searchParams.get('startDate') as string);
	const endDate = new Date(searchParams.get('endDate') as string);
	const guests = searchParams.get('guests') as string;

	return (
		<section className='container mx-auto p-5'>
			<h1 className='text-primaryDarker text-xl font-semibold'>Sua viagem!</h1>

			<div className='flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg'>
				<div className='flex items-center gap-3 pb-5 border-b border-graylighter border-solid'>
					<div className='relative h-[106px] w-[124px]'>
						<Image
							className='rounded-lg'
							src='/hotel.svg'
							alt='Hotel'
							style={{ objectFit: 'cover' }}
							fill
						/>
					</div>

					<div className='flex flex-col'>
						<h2 className='text-xl text-primaryDarker font-semibold'>Fuck</h2>

						<div className='flex items-center gap-1'>
							{/* <ReactCountryFlag
								countryCode={trip.countryCode}
								svg
							/> */}
							<p className='text-xs text-grayPrimary'>Fim do mundo</p>
						</div>
					</div>
				</div>

				<h3 className='font-semibold text-lg text-primaryDarker mt-3'>Informações sobre o preço</h3>

				<div className='flex justify-between mt-1'>
					<p className='text-primaryDarker'>Total:</p>
					<p className='font-medium'>R$ 100</p>
				</div>
			</div>

			<div className='flex-flex-col mt-5 text-primaryDarker'>
				<h3 className='font-semibold'>Data</h3>

				<p>
					{format(startDate, "dd 'de' MMMM", { locale: ptBR })} -
					{format(endDate, "dd 'de' MMMM", { locale: ptBR })}
				</p>

				<h3 className='font-semibold mt-3'>Hóspedes</h3>
				<p>guests hóspedes</p>

				<Button className='mt-5 w-full'>Finalizar reserva</Button>
			</div>
		</section>
	);
};

export default TripConfirmation;
