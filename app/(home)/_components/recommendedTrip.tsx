import TripItem from "@/app/_components/tripItem";
import { db } from "@/app/_lib/prisma";

const RecommendedTrips = async () => {
   const trips = await db.trip.findMany({});

   return (
      <div className="p-5">
         <div className="flex gap-2 items-center">
            <div className="w-full h-[1px] bg-grayPrimary"></div>
            <p className="text-grayPrimary font-medium whitespace-nowrap">Destinos Recomendados</p>
            <div className="w-full h-[1px] bg-grayPrimary"></div>
         </div>

         <div className="flex flex-col items-center gap-5 mt-5">
            {trips.map((trip) => (
               <TripItem key={trip.id} trip={trip} />
            ))}
         </div>
      </div>
   );
};

export default RecommendedTrips;
