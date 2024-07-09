import Image from "next/legacy/image";
import styles from "./page.module.css";

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Blog from "@/components/blog";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <>
      <Navbar main_page={true} />
      <main className={styles.page}>
        <Hero />
        <Skills />
        <Projects />
        <Blog max_posts={3} />
        <Contact />
      </main>
    </>
  );
}
