import Button from '@/app/_components/button';
import Image from 'next/image';

interface TripLocationProps {
	location: string;
	locationDescription: string;
}

const TripLocation = ({ location, locationDescription }: TripLocationProps) => {
	return (
		<section className='container mx-auto p-5'>
			<h2 className='semi-bold text-primaryDarker mb-5'>Localização</h2>

			<div className='relative h-[300px] w-full'>
				<Image
					className='rounded-lg shadow-md'
					src='/map-mobile.svg'
					alt={location}
					fill
					style={{ objectFit: 'cover' }}
				/>
			</div>

			<h3 className='text-sm font-semibold text-primaryDarker mt-3'>{location}</h3>
			<p className='text-xs text-primaryDarker mt-2 leading-5'>{locationDescription}</p>
			<Button
				className='w-full mt-5'
				variant='outlined'
			>
				Ver no Google Maps
			</Button>
		</section>
	);
};

export default TripLocation;
