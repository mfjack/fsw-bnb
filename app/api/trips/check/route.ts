import { db } from "@/app/_lib/prisma";
import { differenceInDays, isBefore } from "date-fns";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
   const req = await request.json();

   const trip = await db.trip.findUnique({
      where: {
         id: req.tripId,
      },
   });

   if (!trip) {
      return new NextResponse(
         JSON.stringify({
            error: {
               code: "TRIP_NOT_FOUND",
            },
         })
      );
   }

   if (isBefore(new Date(req.startDate), new Date(trip.startDate))) {
      return new NextResponse(
         JSON.stringify({
            error: {
               code: "INVALID_START_DATE",
            },
         }),
         {
            status: 400,
         }
      );
   }

   // if (isBefore(new Date(trip.endDate), new Date(req.endDate))) {
   //    return new NextResponse(
   //       JSON.stringify({
   //          error: {
   //             code: "INVALID_END_DATE",
   //          },
   //       }),
   //       {
   //          status: 401,
   //       }
   //    );
   // }

   const reservations = await db.tripReservation.findMany({
      where: {
         tripId: req.tripId,
         startDate: {
            lte: new Date(req.endDate),
         },
         endDate: {
            gte: new Date(req.startDate),
         },
      },
   });

   if (reservations.length > 0) {
      return new NextResponse(
         JSON.stringify({
            error: {
               code: "TRIP_ALREADY_RESERVED",
            },
         })
      );
   }

   return new NextResponse(
      JSON.stringify({
         success: true,
         trip,
         totalPrice: differenceInDays(new Date(req.endDate), new Date(req.startDate)) * Number(trip.pricePerDay),
      })
   );
}
