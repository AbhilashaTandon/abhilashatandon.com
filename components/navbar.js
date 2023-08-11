
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import Logo from "./logo";

function NavLink({route, name}){
  return(
    <li>
      <Link href={route} className={styles.nav_link}>{name}</Link>
    </li>
  );
}

export default function Navbar() {
  return (
    <ul className={styles.top}>
        <Logo />
      <div className={styles.navbar}>
        <NavLink route="/projects" name="Projects"/>
        <NavLink route="/articles" name="Articles"/>
        <NavLink route="/resume" name="Resume"/>
        <NavLink route="/about" name="About"/>
      </div>
    </ul>
  );
}


