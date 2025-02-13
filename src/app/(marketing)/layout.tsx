import "~/styles/globals.css";

import PublicNavbar from "../components/navigation/PublicNavbar";

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
        <PublicNavbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
