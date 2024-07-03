import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params: { userId } }: { params: { userId: string } }) {
   const { searchParams } = new URL(request.url);

   try {
      if (!userId) {
         return new NextResponse(JSON.stringify({ message: "Missing userId" }), { status: 400 });
      }

      const reservations = await db.tripReservation.findMany({
         where: {
            userId: userId,
         },
         include: {
            trip: true,
         },
      });

      return new NextResponse(JSON.stringify(reservations), { status: 200 });
   } catch (error) {
      console.error("Error fetching user reservations:", error);
      return new NextResponse(JSON.stringify({ message: "Error fetching user reservations" }), { status: 500 });
   }
}
