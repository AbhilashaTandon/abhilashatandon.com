import Image from "next/image";
import styles from "./page.module.css";

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Skills from "@/components/skills"
import Projects from "@/components/projects";
import Blog from "@/components/blog";

export default function Home() {
  return (
    <main className={styles.page}>
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Blog />
      <a
        href="https://www.flaticon.com/free-icons/software-development"
        title="software development icons">
        Software development icon created by Witdhawaty - Flaticon
      </a>
      <a href="https://www.flaticon.com/free-icons/data" title="data icons">Data icon created by Freepik - Flaticon</a>
      <a href="https://www.flaticon.com/free-icons/neural-network" title="neural network icons">Neural network icon created by Freepik - Flaticon</a>

    </main>

  );
}
