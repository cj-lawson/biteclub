import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "~/app/_components/ui/sidebar";
import { AppSidebar } from "../../_components/ui/app-sidebar";

import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "BiteClub",
  description: "All your recipes in one place",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          <SidebarInset>
            <main>{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
