import { Html, Head, Main, NextScript } from "next/document";
import Navbar from "@/components/navbar";
import Logo from "@/components/logo";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Logo />
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
