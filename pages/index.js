import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import General from "@/styles/General.module.css";
import testing1 from "../public/images/testing1.png";
import HomeStyle from "@/styles/HomePage.module.css"

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
        <div class={HomeStyle.intro}>
          <div>
            <h1 className={General.large_text}>Hello, World!</h1>
            <p className={General.medium_text}>
              I'm Abhilasha Tandon, a passionate developer with versatile
              skills. I'm currently a senior at NYU's College of Arts and
              Science studying Computer Science and Mathematics.{" "}
            </p>
            <p>
              I love Machine Learning, Natural Language Processing, Web Design, Abstract Math, and creating efficient, elegant, and powerful software.
            </p>
          </div>
          <Image src={testing1} alt="error" class={HomeStyle.profile} />
        </div>
      </main>
    </>
  );
}
