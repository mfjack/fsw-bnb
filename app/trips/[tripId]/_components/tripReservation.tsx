"use client";

import Button from "@/app/_components/button";
import DatePicker from "@/app/_components/datePicker";
import Input from "@/app/_components/input";
import { differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface TripReservationProps {
   tripId: string;
   tripStartDate: Date;
   tripEndDate: Date;
   maxGuests?: number;
   pricePerDay: number;
}

interface TripReservationForm {
   guests: number;
   startDate: Date;
   endDate: Date;
}

const TripReservation = ({ tripId, maxGuests, tripStartDate, tripEndDate, pricePerDay }: TripReservationProps) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      control,
      watch,
      setError,
   } = useForm<TripReservationForm>();

   const router = useRouter();

   const onSubmit = async (data: TripReservationForm) => {
      const response = await fetch("/api/trips/check", {
         method: "POST",
         body: Buffer.from(
            JSON.stringify({
               startDate: data.startDate,
               endDate: data.endDate,
               tripId,
            })
         ),
      });

      router.push(`/trips/${tripId}/confirmation?startDate=${data.startDate?.toISOString()}&endDate=${data.endDate?.toISOString()}&guests=${data.guests}`);
   };

   const startDate = watch("startDate");
   const endDate = watch("endDate");

   return (
      <section className="container mx-auto flex flex-col p-5 gap-2">
         <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2">
               <Controller
                  name="startDate"
                  rules={{
                     required: {
                        value: true,
                        message: "Data inicial é obrigatória",
                     },
                  }}
                  control={control}
                  render={({ field }) => (
                     <DatePicker
                        className="w-full"
                        placeholderText="Data de Início"
                        onChange={field.onChange}
                        selected={field.value}
                        error={!!errors.startDate}
                        errorMessage={errors.startDate?.message?.toString()}
                        minDate={new Date()}
                     />
                  )}
               />

               <Controller
                  name="endDate"
                  control={control}
                  rules={{
                     required: {
                        value: true,
                        message: "Data final é obrigatória",
                     },
                  }}
                  render={({ field }) => (
                     <DatePicker
                        className="w-full"
                        placeholderText="Data Final"
                        onChange={field.onChange}
                        selected={field.value}
                        error={!!errors.endDate}
                        errorMessage={errors.endDate?.message?.toString()}
                        minDate={startDate ?? tripStartDate}
                     />
                  )}
               />
            </div>

            <Input
               type="number"
               placeholder={`Número de hóspedes (max: ${maxGuests})`}
               {...register("guests", {
                  required: {
                     value: true,
                     message: "Número de hóspedes é obrigatório",
                  },
                  max: {
                     value: maxGuests ?? 0,
                     message: `Número de hóspedes não pode ser maior que ${maxGuests}.`,
                  },
               })}
               error={!!errors.guests}
               errorMessage={errors.guests?.message?.toString()}
            />

            <div className="flex justify-between mt-2">
               <p className="text-sm font-medium text-primaryDarker">Total:</p>
               <p className="text-sm font-medium text-primaryDarker">R$ {startDate && endDate ? differenceInDays(endDate, startDate) * pricePerDay : "0"}</p>
            </div>

            <div className="pb-5 border-b border-grayLighter">
               <Button type="submit" className="mt-3 w-full">
                  Reservar
               </Button>
            </div>
         </form>
      </section>
   );
};

export default TripReservation;
