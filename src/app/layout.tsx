"use client"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientSessionProvider from "./clientSessionProvider";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation"; // Import the usePathname hook

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current pathname

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Conditionally render the Navbar component based on the pathname */}
        {pathname !== "/login" && <Navbar />} 

        <ClientSessionProvider>{children}</ClientSessionProvider>
      </body>
    </html>
  );
}
