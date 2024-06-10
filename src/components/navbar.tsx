import Link from "next/link";
import Styles from "../styles/navbar.module.css";
import React from "react";

export default function Navbar() {
  return (
    <div className={Styles.navbar}>
      <div className={Styles.header}>
        
        <Logo 
          route = "#hero"
          name="ABHILASHATANDON.com"
        />
        <div></div>
        <NavLink
          route="#skills"
          name="Skills"
        />
        <NavLink
          route="#projects"
          name="Projects"
        />
        <NavLink
          route="#blog"
          name="Blog"
        />
        <NavLink
          route="#contact"
          name="Contact"
        />
        <div>
          <div className={Styles.button}>
            <NavLink
              route="/resume"
              name="Resume"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavLink({ route, name }: { route: string; name: string }) {
  return (
    <Link
      href={route}
      className={Styles.navlink}>
      {name}
    </Link>
  );
}

function Logo({ route, name }: { route: string, name: string }) {
  return (
    <Link
      href={route} //TODO: change this to the top of the page
      id={Styles.logo}>
      {name}
    </Link>
  );
}
