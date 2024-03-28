'use client';

import Button from '@/app/_components/button';
import DatePicker from '@/app/_components/datePicker';
import Input from '@/app/_components/input';
import { Trip } from '@prisma/client';

interface TripReservationProps {
	trip: Trip;
}

const TripReservation = ({ trip }: TripReservationProps) => {
	return (
		<section className='container mx-auto p-5 flex flex-col gap-2'>
			<div className='flex gap-2'>
				<DatePicker
					className='w-full'
					placeholderText='Data de Início'
					onChange={() => {}}
				/>
				<DatePicker
					className='w-full'
					placeholderText='Data Final'
					onChange={() => {}}
				/>
			</div>

			<Input placeholder={`Número de hóspedes (max: ${trip.maxGuests})`} />

			<div className='flex justify-between mt-2'>
				<p className='text-sm font-medium text-primaryDarker'>Total:</p>
				<p className='text-sm font-medium text-primaryDarker'>R${trip.pricePerDay.toString()}</p>
			</div>

			<Button className='mt-3'>Reservar</Button>
		</section>
	);
};

export default TripReservation;
