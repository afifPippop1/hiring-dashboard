import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito_Sans, Nunito } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const nunitoMono = Nunito({
  variable: "--font-nunito-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hiring dashboard",
  description: "Your easy to use hiring platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} ${nunitoMono.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <main className="bg-neutral-20 h-svh w-svw">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
