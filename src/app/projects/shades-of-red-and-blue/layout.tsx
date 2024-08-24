import type { Metadata } from "next";
import Navbar from "@/components/navbar";

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
      <body>
        <Navbar main_page={false} />
        {children}
      </body>
    </html>
  );
}
