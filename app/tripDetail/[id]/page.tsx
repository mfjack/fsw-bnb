import { prisma } from '@/app/_lib/prisma';
import TripHeader from '../_components/tripHeader';
import TripReservation from '../_components/tripReservation';
import TripDescription from '../_components/tripDescription';
import TripHighlights from '../_components/tripHighlights';
import TripLocation from '../_components/tripLocation';

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
			<TripReservation
				tripStartDate={trip.startDate}
				tripEndDate={trip.endDate}
				maxGuests={trip.maxGuests}
				pricePerDay={Number(trip.pricePerDay)}
			/>
			<TripDescription description={trip.description} />
			<TripHighlights highlights={trip.highlights} />
			<TripLocation
				location={trip.location}
				locationDescription={trip.locationDescription}
			/>
		</>
	);
};

export default TripDetails;
