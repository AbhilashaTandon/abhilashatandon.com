import type { Metadata } from "next";
import "./globals.css";
import { Nunito_Sans, Roboto } from "next/font/google";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--primary-font",
  weight: "variable",
  adjustFontFallback: false,
  display: "swap",
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
