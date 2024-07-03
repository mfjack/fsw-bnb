import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/_lib/prisma";

export async function DELETE(_request: NextRequest, { params: { reservationId } }: { params: { reservationId: string } }) {
   try {
      if (!reservationId) {
         return new NextResponse(JSON.stringify({ message: "Missing reservationId" }), { status: 400 });
      }

      await db.tripReservation.delete({
         where: {
            id: reservationId,
         },
      });

      return new NextResponse(JSON.stringify({ message: "Reservation deleted successfully" }), { status: 200 });
   } catch (error) {
      console.error("Error deleting reservation:", error);
      return new NextResponse(JSON.stringify({ message: "Error deleting reservation" }), { status: 500 });
   }
}
