import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Home, HandCoins, User2, ChartColumnBig, LogOut } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { signOut } from 'next-auth/react';
import { Separator } from './ui/separator';


// Menu items.
const items = [
    { title: "Inicio", url: "/", icon: Home, },
    { title: "Usuarios", url: "/users", icon: User2, },
    { title: "Ingresos-Gastos", url: "/movements", icon: HandCoins, },
    { title: "Reportes", url: "/reports", icon: ChartColumnBig, },
];

export function AppSidebar() {
    const router = useRouter();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <Link href="/">
                    <Image src="/logo.svg" alt="Logo" width={150} height={50} />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = router.pathname === item.url; // Verifica si la ruta actual coincide con la URL del ítem
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton style={{ background: isActive ? "#e0c8ff" : "transparent", color: isActive ? "#8A3DBE" : "#000000" }} asChild isActive={isActive}>
                                            <Link onClick={() => signOut({ callbackUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000' })} href={item.url} className={`${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                                                }`}>

                                                <item.icon />
                                                <span className="ml-2">{item.title}</span>


                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )

                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <Separator/>
            <SidebarFooter>
                <SidebarMenu>

                    <SidebarMenuItem key={"Cerrar sesion"}>
                        <SidebarMenuButton asChild className='font-m'>
                            <Link href={"/Logout"}>

                                <LogOut />
                                <span className="ml-2">{"Cerrar sesion"}</span>


                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                </SidebarMenu>
            </SidebarFooter>
            <Separator/>
            <SidebarRail />
        </Sidebar>
    );
}
