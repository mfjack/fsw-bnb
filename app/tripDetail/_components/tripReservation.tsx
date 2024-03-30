'use client';

import Button from '@/app/_components/button';
import DatePicker from '@/app/_components/datePicker';
import Input from '@/app/_components/input';
import { differenceInDays } from 'date-fns';
import { difference } from 'next/dist/build/utils';
import { Controller, useForm } from 'react-hook-form';

interface TripReservationProps {
	tripStartDate: Date;
	tripEndDate: Date;
	maxGuests?: number;
	pricePerDay: number;
}

const TripReservation = ({ maxGuests, tripStartDate, tripEndDate, pricePerDay }: TripReservationProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		watch,
	} = useForm();

	const onSubmit = (data: any) => {
		console.log({ data });
	};

	const startDate = watch('startDate');
	const endDate = watch('endDate');

	return (
		<section className='container mx-auto flex flex-col p-5 gap-2'>
			<form
				className='flex flex-col gap-2'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='flex gap-2'>
					<Controller
						name='startDate'
						rules={{
							required: {
								value: true,
								message: 'Data inicial é obrigatória',
							},
						}}
						control={control}
						render={({ field }) => (
							<DatePicker
								className='w-full'
								placeholderText='Data de Início'
								onChange={field.onChange}
								selected={field.value}
								error={!!errors.startDate}
								errorMessage={errors.startDate?.message?.toString()}
							/>
						)}
					/>

					<Controller
						name='endDate'
						control={control}
						rules={{
							required: {
								value: true,
								message: 'Data final é obrigatória',
							},
						}}
						render={({ field }) => (
							<DatePicker
								className='w-full'
								placeholderText='Data Final'
								onChange={field.onChange}
								selected={field.value}
								error={!!errors.endDate}
								errorMessage={errors.endDate?.message?.toString()}
								minDate={startDate ?? tripStartDate}
							/>
						)}
					/>
				</div>

				<Input
					type='number'
					placeholder={`Número de hóspedes (max: ${maxGuests})`}
					{...register('guests', {
						required: {
							value: true,
							message: 'Número de hóspedes é obrigatório',
						},
					})}
					error={!!errors.guests}
					errorMessage={errors.guests?.message?.toString()}
				/>

				<div className='flex justify-between mt-2'>
					<p className='text-sm font-medium text-primaryDarker'>Total:</p>
					<p className='text-sm font-medium text-primaryDarker'>
						R$ {startDate && endDate ? differenceInDays(endDate, startDate) * pricePerDay : 'R$ 0.00'}
					</p>
				</div>

				<div className='pb-5 border-b border-grayLighter'>
					<Button
						type='submit'
						className='mt-3 w-full'
					>
						Reservar
					</Button>
				</div>
			</form>
		</section>
	);
};

export default TripReservation;
