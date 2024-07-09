import Link from "next/link";
import Styles from "../styles/navbar.module.css";

export default function Navbar({ main_page }: { main_page: boolean }) {
  var logo = (
    <div className={Styles.logo}>
      <Heading route="#hero" name="ABHILASHATANDON.com" />
    </div>
  );
  var links = (
    <>
      <div></div>
      <div className={Styles.section}>
        <Heading route="#skills" name="Skills" />
      </div>
      <div className={Styles.section}>
        <Heading route="#projects" name="Projects" />
      </div>
      <div className={Styles.section}>
        <Heading route="#blog" name="Blog" />
      </div>
      <div className={Styles.section}>
        <Heading route="#contact" name="Contact" />
      </div>
      <div className={Styles.button}>
        <Heading route="/resume.pdf" name="Resume" />
      </div>
    </>
  );
  if (main_page) {
    return (
      <nav className={Styles.navbar}>
        {logo}
        {links}
      </nav>
    );
  } else {
    return <nav className={Styles.navbar}>{logo}</nav>;
  }
}

function Heading({ route, name }: { route: string; name: string }) {
  return <Link href={route}>{name}</Link>;
}
