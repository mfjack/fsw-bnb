import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/app/_providers/auth";
import Header from "./_components/header";
import Footer from "./_components/footer";
import ToastProvider from "./_providers/toast";

const poppins = Poppins({
   subsets: ["latin"],
   weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
   title: "TripBnB",
   description: "Sistema de reservas de hospedagem!",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="pt-BR">
         <body className={poppins.className}>
            <NextAuthProvider>
               <ToastProvider>
                  <div className="flex flex-col h-screen">
                     <div className="h-[5rem]">
                        <Header />
                     </div>
                     <div className="flex-1">{children}</div>
                     <div className="h-[5rem]">
                        <Footer />
                     </div>
                  </div>
               </ToastProvider>
            </NextAuthProvider>
         </body>
      </html>
   );
}
