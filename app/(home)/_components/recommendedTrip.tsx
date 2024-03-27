import TripItem from '@/app/_components/tripItem';
import { Trip } from '@prisma/client';

const RecommendedTrip = async () => {
	const data = await fetch('http://localhost:3000/hello').then(res => res.json());

	return (
		<section className='container mx-auto mt-5 px-5'>
			<div className='flex items-center'>
				<div className='w-full h-[1px] bg-grayLighter'></div>
				<h2 className='px-4 font-medium text-grayPrimary whitespace-nowrap'>Destinos Recomendados</h2>
				<div className='w-full h-[1px] bg-grayLighter'></div>
			</div>

			<div className='flex flex-col items-center mt-5 gap-5'>
				{data.map((trip: Trip) => (
					<TripItem
						key={trip.id}
						trip={trip}
					/>
				))}
			</div>
		</section>
	);
};

export default RecommendedTrip;
