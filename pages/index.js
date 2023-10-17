import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import General from "@/styles/General.module.css";
import testing1 from "../public/images/testing1.png";
import HomeStyle from "@/styles/HomePage.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Abhilasha Tandon</title>
      </Head>
      <>
        <div class={HomeStyle.intro}>
          <div>
            <h2>Hello, World!</h2>
            <h4>
              I&apos;m Abhilasha Tandon, a passionate developer with versatile
              skills. I&apos;m currently a senior at NYU&apos;s College of Arts
              and Science studying Computer Science and Mathematics.{" "}
            </h4>
            <h5>
              I love Machine Learning, Natural Language Processing, Web Design,
              Abstract Math, and creating efficient, elegant, and powerful
              software.
            </h5>
          </div>
          <Image src={testing1} alt="error" class={HomeStyle.profile} />
        </div>
      </>
    </>
  );
}
