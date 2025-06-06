import type { Metadata } from "next";
import { Inter, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { ClientLayout } from "@/components/ClientLayout";
import BotPart from "@/components/BotPart";
import { MainPart } from "@/components/MainPart";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
    subsets: ["latin"],
    variable: "--font-instrument-sans",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} ${instrumentSans.variable} antialiased`}
      >
        <ClientLayout>
          <NavBar />
          <MainPart>
            {children}
          </MainPart>
          <BotPart />
        </ClientLayout>
      </body>
    </html>
  );
}
