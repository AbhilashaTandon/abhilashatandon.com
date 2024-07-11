import styles from "../page.module.css";
import Navbar from "@/components/navbar";
//import customStyling from "style.css";

import Projects from "@/components/projects";

import Link from "next/link";

export default function Page() {
  return (
    <>
      <Navbar main_page={false} />
      <main className={styles.page}>
        <Projects />
      </main>
    </>
  );
}

function Heading({ route, name }: { route: string; name: string }) {
  return <Link href={route}>{name}</Link>;
}
