const classNames = require('classnames');

import Link from "next/link";
import Styles from "@/styles/Navbar.module.css";
import General from "@/styles/General.module.css"
import Logo from "./logo";

function NavLink({route, name}){
  return(
    <li>
      <Link href={route} className={Styles.nav_link}>{name}</Link>
    </li>
  );
}

export default function Navbar() {
  var classnames = classNames(Styles.top);
  return (
    <ul className={classnames}>
        <Logo />
      <div className={Styles.navbar}>
        <NavLink route="/projects" name="Projects"/>
        <NavLink route="/articles" name="Articles"/>
        <NavLink route="/resume" name="Resume"/>
        <NavLink route="/about" name="About"/>
      </div>
    </ul>
  );
}


