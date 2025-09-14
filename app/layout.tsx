import type { Metadata } from "next";
import SafeHydrate from "./components/SafeHydrate/page";
import "./globals.css";

export const metadata: Metadata = {
  title: "CookMate",
  description: "A Cooking Agent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
         <SafeHydrate>{children}</SafeHydrate>
      </body>
    </html>
  );
}
