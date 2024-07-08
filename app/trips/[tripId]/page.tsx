import { db } from "@/app/_lib/prisma";
import TripHeader from "./_components/tripHeader";
import TripReservation from "./_components/tripReservation";
import TripHighlights from "./_components/tripHighlights";
import TripLocation from "./_components/tripLocation";
import TripDescription from "./_components/tripDescription";

const TripDetailsPage = async ({ params }: { params: { tripId: string } }) => {
   const trip = await db.trip.findUnique({
      where: {
         id: params.tripId,
      },
   });

   if (!trip) {
      return null;
   }

   return (
      <>
         <TripHeader trip={trip} />
         <TripReservation tripId={trip.id} tripStartDate={trip.startDate} tripEndDate={trip.endDate} maxGuests={trip.maxGuests} pricePerDay={trip.pricePerDay as any} />
         <TripDescription description={trip.description} />
         <TripHighlights highlights={trip.highlights} />
         <TripLocation location={trip.location} locationDescription={trip.locationDescription} />
      </>
   );
};

export default TripDetailsPage;
