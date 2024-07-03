"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import UserReservationItem from "./_components/userReservationItem";
import Button from "../_components/button";

const MyTrips = () => {
   const [reservations, setReservations] = useState<
      Prisma.TripReservationGetPayload<{
         include: { trip: true };
      }>[]
   >([]);

   const { status, data } = useSession();

   const router = useRouter();

   const fetchReservations = useCallback(async () => {
      const response = await fetch(`/api/user/${(data?.user as any)?.id}/reservations`);

      const json = await response.json();

      setReservations(json);
   }, [data?.user]);

   useEffect(() => {
      if (status === "unauthenticated") {
         return router.push("/");
      }

      fetchReservations();
   }, [status, fetchReservations, router]);

   return (
      <div className="container mx-auto p-5">
         <h1 className="font-semibold text-primaryDarker text-xl lg:mb-5">Minhas Viagens</h1>
         {reservations.length > 0 ? (
            <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-14">
               {reservations?.map((reservation) => (
                  <UserReservationItem fetchReservations={fetchReservations} key={reservation.id} reservation={reservation} />
               ))}
            </div>
         ) : (
            <div className="flex flex-col">
               <p className="mt-2 font-medium text-primaryDarker">Você ainda não tem nenhuma reserva! =(</p>

               <Link className="w-full mt-2 lg:mt-5 bg-primary text-white hover:bg-primaryDarker text-center rounded-lg py-2" href="/">
                  Fazer reserva
               </Link>
            </div>
         )}
      </div>
   );
};

export default MyTrips;
