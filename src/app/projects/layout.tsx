import type { Metadata } from "next";
import { Nunito_Sans, Roboto } from "next/font/google";
import Navbar from "@/components/navbar";
import styles from "../page.module.css";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--primary-font",
  weight: "variable",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "AbhilashaTandon.com",
  description: "Code, Art, and Math",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
