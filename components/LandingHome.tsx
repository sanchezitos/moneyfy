import { signIn, } from "next-auth/react";
import AuthButtons from "./AuthButtons";
import Navbar from "./NavBar";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import Image from "next/image";


export default function LandingHome() {
    const stack = [
        { src: "/nodejsIcon.svg", name: "NodeJs" },
        { src: "/next.svg", name: "NextJs" },
        { src: "/typescriptIcon.svg", name: "Typescript" },
        { src: "/tailwindIcon.svg", name: "Tailwind" },
        { src: "/shadcnIcon.svg", name: "Shandcn" },
        { src: "/graphqlIcon.svg", name: "GraphQL" },
        { src: "/apolloIcon.svg", name: "Apollo-server" },
        { src: "/postgresqlIcon.svg", name: "PostgreSql" },
        { src: "/supabaseIcon.svg", name: "Supabase" },
        { src: "/auth0Icon.svg", name: "Auth0" },
        { src: "/prismaIcon.svg", name: "Prisma" },
    ]
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Navbar fijo arriba */}
            <Navbar />

            {/* Contenedor principal */}
            <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Bienvenido a MONEYFY!</h1>
                <p className="text-lg text-gray-600 max-w-2xl mb-6">
                    Sistema de ingresos y gastos desarrollado como prueba para PrevalentWare by Juan Sánchez.
                </p>
                <button onClick={() => signIn('auth0')} className="bg-purple-600 text-white px-4 py-2 rounded">
                    Iniciar sesión
                </button>
                <div className="max-w-[500px] mx-auto">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="description">
                            <AccordionTrigger className="text-xl font-semibold">¿Qué es MONEYFY?</AccordionTrigger>

                            <AccordionContent className="text-md">
                                MONEYFY es un sistema básico de gestión de usuarios para registrar ingresos y gastos,
                                desarrollado como prueba técnica para la empresa PrevalentWare. Tiene un CRUD para usuarios, ingresos, gastos y reportes
                            </AccordionContent>
                            <AccordionItem value="stack">
                                <AccordionTrigger className="text-xl font-semibold">Tecnologías usadas</AccordionTrigger>
                                <AccordionContent className="text-md">
                                    <ScrollArea className="w-auto whitespace-nowrap rounded-md border">
                                        <div className="flex w-max space-x-4 p-4">
                                            {stack.map(item => {
                                                return (
                                                    <div key={item.name} className="flex items-center mx-auto m-1">
                                                        <Image className="mr-2" src={item.src} width={25} height={25} alt={item.name} />
                                                        <span className="text-md text-gray-500"> {item.name}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <ScrollBar orientation="horizontal" />
                                    </ScrollArea>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="details">
                                <AccordionTrigger className="text-xl font-semibold">Detalles del proyecto</AccordionTrigger>
                                <AccordionContent className="text-md">
                                    <ScrollArea className="w-auto whitespace-nowrap rounded-md border">
                                        <div className="flex w-max space-x-4 p-4">
                                            {stack.map(item => {
                                                return (
                                                    <div key={item.name} className="flex items-center mx-auto m-1">
                                                        <Image className="mr-2" src={item.src} width={25} height={25} alt={item.name} />
                                                        <span className="text-md text-gray-500"> {item.name}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <ScrollBar orientation="horizontal" />
                                    </ScrollArea>
                                </AccordionContent>
                            </AccordionItem>
                        </AccordionItem>
                    </Accordion>
                </div>


            </main>

            {/* Footer o espacio inferior opcional */}
            <footer className="text-center p-4 text-gray-500">
                © 2024 Juan David Sánchez. Todos los derechos reservados.
            </footer>
        </div>
    );
}
