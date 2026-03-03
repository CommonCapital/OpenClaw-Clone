import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/providers";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Sidebar } from "./components/ui/Sidebar";



export default  async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    
       const session = await auth.api.getSession({
              headers: await headers(),
            });
          
            if (!session) {
              redirect("/auth/sign-in");
            }
  return (
    <div className="flex min-h-screen w-full bg-[#0a0900]">
      <Sidebar />
      <main className="flex flex-1 flex-col">
        {children}
      </main>
    </div>
  );
}
