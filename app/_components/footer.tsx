import Image from "next/image";

const Footer = () => {
   return (
      <footer className="container mx-auto mt-5 p-5 h-16 bg-walterWhite flex items-center justify-center gap-3">
         <Image src="/logo.svg" alt="Logotipo BNB" width={20} height={20} />
         <p className="text-center text-sm text-primaryDarker font-medium">Todos os direitos reservados © 2024</p>
      </footer>
   );
};

export default Footer;
