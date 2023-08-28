const classNames = require("classnames");

import Link from "next/link";
import Styles from "@/styles/Navbar.module.css";
import General from "@/styles/General.module.css";
import Logo from "./logo";

function NavLink({ route, name }) {
  var link_style = classNames(Styles.nav_link, General.heading);
    return (
        <div>
            <Link href={route} className={link_style}>
                {name}
            </Link>
        </div>
    );
}

export default function Navbar() {
    return (
        <div className={Styles.header}>
            <div className={Styles.top}>
                <Logo />
                <div className={Styles.navbar}>
                    <NavLink route="/projects" name="Projects" />
                    <NavLink route="/articles" name="Articles" />
                    <NavLink route="/resume" name="Resume" />
                    <NavLink route="/about" name="About" />
                </div>
            </div>
            <hr></hr>
        </div>
    );
}
