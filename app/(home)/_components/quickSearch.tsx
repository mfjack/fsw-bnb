import Image from "next/image";
import Link from "next/link";

const QuickSearch = () => {
   return (
      <>
         <div className="flex gap-2 items-center">
            <div className="w-full h-[1px] bg-grayPrimary"></div>
            <p className="text-grayPrimary font-medium whitespace-nowrap">Tente pesquisar por</p>
            <div className="w-full h-[1px] bg-grayPrimary"></div>
         </div>

         <div className="flex w-full py-5 justify-around">
            <Link href={"/trips/search?text=hotel"} className="flex flex-col items-center gap-1">
               <Image src="/hotel-icon.png" alt="Hotel" width={32} height={32} />
               <p className="text-primaryDarker text-sm">Hotel</p>
            </Link>
            <Link href={"/trips/search?text=fazenda"} className="flex flex-col items-center gap-1">
               <Image src="/farm-icon.png" alt="Fazenda" width={32} height={32} />
               <p className="text-primaryDarker text-sm">Fazenda</p>
            </Link>
            <Link href={"/trips/search?text=Chalé"} className="flex flex-col items-center gap-1">
               <Image src="/cottage-icon.png" alt="Chalé" width={32} height={32} />
               <p className="text-primaryDarker text-sm">Chalé</p>
            </Link>
            <Link href={"/trips/search?text=pousada"} className="flex flex-col items-center gap-1">
               <Image src="/inn-icon.png" alt="Pousada" width={32} height={32} />
               <p className="text-primaryDarker text-sm">Pousada</p>
            </Link>
         </div>
      </>
   );
};

export default QuickSearch;
