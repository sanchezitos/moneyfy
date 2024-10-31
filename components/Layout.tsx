// components/Layout.js
import { AppSidebar } from "@/components/sideBar";
import { useSession } from 'next-auth/react';
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BreadcrumbWithCustomSeparator } from "./breadCumb";
import { Separator } from "@radix-ui/react-separator";
import LandingHome from "./LandingHome";
import { Toaster } from "./ui/sonner";

export default function Layout({ children }) {
  const { data: session } = useSession();

  return (
    session ? <>
      <div className="flex h-screen">
        {/* Barra lateral fija */}
        <SidebarProvider>
          <AppSidebar />

          <SidebarInset className="h-1">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <BreadcrumbWithCustomSeparator />
            </header>
            <main className="p-4">
              {children}
            </main>
            <Toaster />
          </SidebarInset>


        </SidebarProvider>

        {/* Contenido dinámico a la derecha */}
      </div>
    </> : <LandingHome />

  );
}
