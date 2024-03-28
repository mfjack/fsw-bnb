import TripItem from '@/app/_components/tripItem';
import { prisma } from '@/app/_lib/prisma';
import { Trip } from '@prisma/client';

const getTrips = async () => {
	const trips = await prisma.trip.findMany({});

	return trips;
};

const RecommendedTrip = async () => {
	const data = await getTrips();

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
