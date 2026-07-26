import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { PillNav } from "./components/pill-nav";
import { BottomDock } from "./components/bottom-dock";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Semester",
  description: "A personal dashboard for the semester.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-base font-sans text-text">
        <PillNav />
        <main className="flex-1 pt-6 pb-24 md:pt-28 md:pb-8">{children}</main>
        <BottomDock />
      </body>
    </html>
  );
}
