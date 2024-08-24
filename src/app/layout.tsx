"use client";

import "./globals.css";

import { ThemeContext, ThemeProvider } from "@/context/lightDarkMode";
import React, { useContext } from "react";

// export const metadata: Metadata = {
//   title: "AbhilashaTandon.com",
//   description: "Code, Art, and Math",
// };

function ThemeContainer(props: any) {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={darkMode ? "darkMode" : "lightMode"}>{props.children}</div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <ThemeContainer>
            <main>{children}</main>
          </ThemeContainer>
        </ThemeProvider>
      </body>
    </html>
  );
}
