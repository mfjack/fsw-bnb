import { db } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params: { userId } }: { params: { userId: string } }) {
   const { searchParams } = new URL(request.url);

   if (!userId) {
      return {
         status: 400,
         body: {
            message: "Missing userId",
         },
      };
   }

   const reservation = await db.tripReservation.findMany({
      where: {
         userId: userId,
      },
      include: {
         trip: true,
      },
   });

   return new NextResponse(JSON.stringify(reservation), { status: 200 });
}
