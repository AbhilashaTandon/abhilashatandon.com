import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import General from "@/styles/General.module.css";

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
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <main>
                <p className={General.heading}>Hello, World!</p>
                <p className={General.body} >I'm Abhilasha Tandon, a passionate developer with versatile skills. I'm currently a senior at NYU's College of Arts and Science studying Computer Science and Mathematics. </p>
            </main>
        </>
    );
}
