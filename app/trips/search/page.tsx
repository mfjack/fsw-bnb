"use client";

import TripItem from "@/app/_components/tripItem";
import { Trip } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const Trips = () => {
   const [trips, setTrips] = useState<Trip[]>([]);

   const searchParams = useSearchParams();

   useEffect(() => {
      const fetchTrips = async () => {
         const response = await fetch(`/api/trips/search?text=${searchParams.get("text") ?? ""}&startDate=${searchParams.get("startDate")}&budget=${searchParams.get("budget")}`);

         const data = await response.json();

         setTrips(data);
      };

      fetchTrips();
   }, [searchParams]);

   return (
      <div className="container mx-auto flex flex-col items-center lg:items-start p-5 lg:pt-10">
         <h1 className="text-primaryDarker font-semibold text-xl lg:w-full lg:text-left lg:text-[2.5rem]">Viagens Encontradas</h1>
         <h2 className="text-grayPrimary font-medium mb-5 lg:mt-6 lg:w-full lg:text-left">
            {trips.length > 0 ? "Listamos as melhores viagens pra você!" : "Não encontramos nada nos seus parâmetros! =("}
         </h2>

         <div className="flex gap-5 flex-wrap justify-center">
            {trips?.map((trip) => (
               <TripItem key={trip.id} trip={trip} />
            ))}
         </div>
      </div>
   );
};

const TripsWrapper = () => (
   <Suspense fallback={<div>Loading...</div>}>
      <Trips />
   </Suspense>
);

export default TripsWrapper;
