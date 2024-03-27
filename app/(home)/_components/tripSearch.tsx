'use client';

import Button from '@/app/_components/button';
import CurrencyInput from '@/app/_components/currencyInput';
import DatePicker from '@/app/_components/datePicker';
import Input from '@/app/_components/input';

const TripSearch = () => {
	return (
		<section className='container mx-auto px-5 bg-tripSearch-background bg-cover bg-center bg-no-repeat'>
			<h1 className='font-semibold text-xl text-primaryDarker text-center'>
				Encontre sua próxima <span className='text-primary'>viagem!</span>
			</h1>

			<div className='flex flex-col gap-4 mt-5'>
				<Input placeholder='Onde você quer ir?' />

				<div className='flex gap-4'>
					<DatePicker
						className='w-full'
						placeholderText='Data de ida'
						onChange={() => {}}
					/>
					<CurrencyInput placeholder='Orçamento' />
				</div>
				<Button>Buscar</Button>
			</div>
		</section>
	);
};

export default TripSearch;
