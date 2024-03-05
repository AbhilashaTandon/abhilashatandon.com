import { Nunito_Sans, Roboto } from "next/font/google";
import "./globals.css";
import React from "react";

const nunito = Nunito_Sans({ subsets: ["latin"], variable: "--primary-font", weight: "variable" });
const roboto = Roboto({ subsets: ["latin"], variable: "--secondary-font", weight: ["300", "400", "500", "700"] });

export const metadata = {
  title: "Abhilasha Tandon: Developer and Creative",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
