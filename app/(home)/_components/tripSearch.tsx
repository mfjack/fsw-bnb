"use client";

import Button from "@/app/_components/button";
import CurrencyInput from "@/app/(home)/_components/currencyInput";
import DatePicker from "@/app/_components/datePicker";
import Input from "@/app/_components/input";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface TripSearchForm {
   text: string;
   startDate: Date | null;
   budget: string;
}

const TripSearch = () => {
   const router = useRouter();

   const {
      control,
      formState: { errors },
      register,
      handleSubmit,
   } = useForm<TripSearchForm>();

   const onSubmit = (data: TripSearchForm) => {
      router.push(`/trips/search?text=${data.text}&startDate=${data.startDate?.toISOString()}&budget=${data.budget}`);
   };

   return (
      <div className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat lg:py-28">
         <h1 className="font-semibold text-2xl text-primaryDarker text-center lg:text-[2.5rem]">
            Encontre sua próxima <span className="text-primary">viagem!</span>
         </h1>

         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-5 lg:flex-row lg:max-w-[948px] lg:mx-auto lg:p-4 lg:bg-primary lg:mt-12 lg:bg-opacity-20 lg:rounded-lg">
            <Input
               placeholder="Onde você quer ir?"
               error={!!errors.text}
               errorMessage={errors.text?.message}
               {...register("text", {
                  required: {
                     value: true,
                     message: "O campo de busca é obrigatório.",
                  },
               })}
            />

            <div className="flex gap-4 lg:w-full">
               <Controller
                  name="startDate"
                  control={control}
                  render={({ field }) => <DatePicker onChange={field.onChange} selected={field.value} placeholderText="Data Final" className="w-full" minDate={new Date()} />}
               />

               <Controller
                  name="budget"
                  control={control}
                  render={({ field }) => <CurrencyInput allowDecimals={false} placeholder="Orçamento" onValueChange={field.onChange as any} value={field.value} onBlur={field.onBlur} />}
               />
            </div>

            <Button type="submit" className="w-full lg:h-fit">
               Buscar
            </Button>
         </form>
      </div>
   );
};

export default TripSearch;
