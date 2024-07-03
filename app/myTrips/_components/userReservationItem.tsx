import React from "react";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import ReactCountryFlag from "react-country-flag";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Button from "@/app/_components/button";

interface UserReservationItemProps {
   reservation: Prisma.TripReservationGetPayload<{
      include: { trip: true };
   }>;
   fetchReservations: () => void;
}

const UserReservationItem = ({ reservation, fetchReservations }: UserReservationItemProps) => {
   const router = useRouter();

   const { trip } = reservation;

   const handleDeleteReservation = async () => {
      const res = await fetch(`/api/trips/reservation/${reservation.id}`, {
         method: "DELETE",
      });

      if (!res.ok) {
         return toast.error("Ocorreu um erro ao cancelar a reserva!");
      }

      toast.success("Reserva cancelada com sucesso!", { position: "bottom-center" });

      fetchReservations();
   };

   return (
      <div className="flex flex-col p-5 mt-5 shadow-lg rounded-lg border border-grayLighter">
         <div className="flex items-center gap-3">
            <div className="relative h-[106px] w-[124px]">
               <Image src={trip.coverImage} alt={trip.name} fill className="rounded-lg shadow-md object-cover" />
            </div>

            <div className="flex flex-col">
               <h2 className="text-xl font-semibold text-primaryDarker">{trip.name}</h2>
               <div className="flex items-center gap-1">
                  <ReactCountryFlag countryCode={trip.countryCode} svg />
                  <p className="text-grayPrimary text-xs underline">{trip.location}</p>
               </div>
            </div>
         </div>

         <div className="flex flex-col mt-3 text-primaryDarker">
            <h3 className="font-semibold">Data:</h3>
            <div className="flex items-center gap-2 mt-1">
               <p>{format(new Date(reservation.startDate), "dd 'de' MMMM", { locale: ptBR })}</p>
               {" - "}
               <p>{format(new Date(reservation.endDate), "dd 'de' MMMM", { locale: ptBR })}</p>
            </div>

            <h3 className="font-semibold mt-3">Hóspedes:</h3>
            <p>{reservation.guests} hóspedes</p>

            <h3 className="font-semibold text-primaryDarker mt-3 pt-3 border-t border-grayLighter">Informações sobre o preço</h3>

            <div className="flex justify-between mt-1">
               <p className="text-primaryDarker">Total:</p>
               <p className="font-medium">R$ {/*totalPrice*/}</p>
            </div>

            <Button className="bg-transparent border border-red-500 text-red-500 hover:text-white hover:bg-red-500 mt-5" onClick={handleDeleteReservation}>
               Cancelar
            </Button>
         </div>
      </div>
   );
};

export default UserReservationItem;
