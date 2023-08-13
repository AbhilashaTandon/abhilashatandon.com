
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Abhilasha Tandon</title>
        <meta charSet="UTF-8"></meta>
        <meta
          name="description"
          content="A Passionate Developer with Versatile Skills"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <p>This is my website!</p>
      </main>
    </>
  );
}
