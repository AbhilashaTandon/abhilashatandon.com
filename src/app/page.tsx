import Image from "next/image";
import styles from "./page.module.css";

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Skills from "@/components/skills"

export default function Home() {
  return (
    <main className={styles.page}>
      <Navbar />
      <Hero />
      <Skills />
    </main>
  );
}
