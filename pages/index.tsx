import Image from "next/image";
import localFont from "next/font/local";
import AuthButtons from "@/components/AuthButtons";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Bienvenido a la Gestión de Finanzas</h1>
      <AuthButtons />
    </div>
  );
}
