import Hero from "@/components/hero";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Blog from "@/components/blog";
import Contact from "@/components/contact";

import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar main_page={true} />
      <Hero />
      <Projects />
      <Skills />
      <Blog max_posts={3} />
      <Contact />
    </>
  );
}
