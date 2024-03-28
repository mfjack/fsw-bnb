import { Trip } from '@prisma/client';
import Image from 'next/image';
import ReactCountryFlag from 'react-country-flag';

interface TripHeaderProps {
	trip: Trip;
}

const TripHeader = ({ trip }: TripHeaderProps) => {
	return (
		<section className='container mx-auto'>
			<div className='relative h-[280px] w-full'>
				<Image
					src={trip.coverImage}
					alt={trip.name}
					style={{ objectFit: 'cover' }}
					fill
				/>
			</div>

			<div className='flex flex-col mt-2 px-5 gap-1'>
				<h1 className='text-primaryDarker font-semibold text-xl'>{trip.name}</h1>
				<div className='flex items-center gap-1'>
					<ReactCountryFlag
						countryCode={trip.countryCode}
						svg
					/>
					<p className='text-xs text-grayPrimary'>{trip.location}</p>
				</div>
				<p className='text-xs text-grayPrimary'>
					<span className='text-primary font-medium'>R${trip.pricePerDay.toString()}</span> por dia
				</p>
			</div>
		</section>
	);
};

export default TripHeader;
