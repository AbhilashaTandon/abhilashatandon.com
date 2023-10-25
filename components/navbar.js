import Link from "next/link";
import Styles from "@/styles/Navbar.module.css";
import Logo from "./logo";

const classNames = require("classnames");

function NavLink({ route, name }) {
  var link_style = classNames(Styles.nav_link);
  return (
    <h5>
      <Link href={route} className={link_style}>
        {name}
      </Link>
    </h5>
  );
}

export default function Navbar() {
  return (
    <nav className={Styles.header}>
      <Logo />
      <div className={Styles.navbar}>
        <NavLink route="/projects" name="Projects" />
        <NavLink route="/articles" name="Articles" />
        <NavLink route="/resume" name="Resume" />
        <NavLink route="/about" name="About" />
      </div>
    </nav>
  );
}
