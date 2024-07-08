import { Trip } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactCountryFlag from "react-country-flag";

interface TripItemProps {
   trip: Trip;
}

const TripItem = ({ trip }: TripItemProps) => {
   return (
      <Link href={`/trips/${trip.id}`}>
         <div className="flex flex-col">
            <div className="relative h-[280px] w-[280px]">
               <Image src={trip.coverImage} alt={trip.name} className="rounded-lg shadow-md bg-cover" fill />
            </div>

            <h3 className="text-primaryDarker font-medium text-sm mt-2">{trip.name}</h3>
            <div className="flex items-center gap-1 my-1">
               <ReactCountryFlag countryCode={trip.countryCode} svg />
               <p className="text-xs text-grayPrimary">{trip.location}</p>
            </div>

            <p className="text-xs text-grayPrimary">
               <span className="text-primary font-medium text-xs">{Number(trip.pricePerDay).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span> por noite
            </p>
         </div>
      </Link>
   );
};

export default TripItem;
