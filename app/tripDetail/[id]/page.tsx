import { prisma } from '@/app/_lib/prisma';
import TripHeader from '../_components/tripHeader';

const getTripDetail = async (tripId: string) => {
	const trip = await prisma.trip.findUnique({
		where: {
			id: tripId,
		},
	});

	return trip;
};

const TripDetails = async ({ params }: { params: { id: string } }) => {
	const trip = await getTripDetail(params.id);

	if (!trip) return null;

	return (
		<>
			<TripHeader trip={trip} />
		</>
	);
};

export default TripDetails;
