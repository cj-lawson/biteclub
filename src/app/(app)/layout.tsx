import "~/styles/globals.css";

import AppNavbar from "../components/navigation/AppNavbar";

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
        <AppNavbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
