import Image from "next/image";
import styles from "./page.module.css";

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <main className={styles.main}>
        <Hero />
      </main>
    </>
  );
}
