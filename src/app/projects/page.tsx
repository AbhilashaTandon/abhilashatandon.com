import styles from "../page.module.css";
import NavStyle from "../../styles/navbar.module.css";
//import customStyling from "style.css";

import Projects from "@/components/projects";

import Link from "next/link";

export default function Page() {
  return (
    <>
      <nav className={NavStyle.logo}>
        <Heading route="" name="ABHILASHATANDON.com" />
      </nav>
      <main className={styles.page}>
        <Projects />
      </main>
    </>
  );
}

function Heading({ route, name }: { route: string; name: string }) {
  return <Link href={route}>{name}</Link>;
}
