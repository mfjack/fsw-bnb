import { db } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
   const req = await request.json();

   const { startDate, endDate, tripId, userId, totalPaid, guests } = req;

   const trip = await db.trip.findUnique({
      where: {
         id: tripId,
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

   await db.tripReservation.create({
      data: {
         startDate,
         endDate,
         tripId,
         userId,
         totalPaid,
         guests,
      },
   });

   return new NextResponse(
      JSON.stringify({
         success: true,
      }),
      {
         status: 200,
      }
   );
}
