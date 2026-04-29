import type { Metadata } from "next";
import { Indie_Flower } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const indie = Indie_Flower({
  variable: '--font-indie',
  weight: ['400'] 
})

export const metadata: Metadata = {
  title: "Your Name in Landsat",
  description: "See your name spelled out in NASA Landsat satellite imagery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased font-sans", indie.className)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
