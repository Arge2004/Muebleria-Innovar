import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/modules/general/layout/header";
import Footer from "@/modules/general/layout/footer"; 
import AOSInit from "@/modules/general/componentes/AOSInit";
import "./globals.css";
import logo from  "@/app/logo.ico"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Galeria Innovar",
  description: "Mueblería ubicada en el municipio de El Santuario, Antioquia, Colombia.",
  icons: {
    icon: logo.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
      <Header />
      <AOSInit />
        {children}
      <Footer />
      </body>
    </html>
  );
}

