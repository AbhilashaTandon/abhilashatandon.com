import Link from "next/link";
import Styles from "../styles/navbar.module.css";

export default function Navbar() {
  return (
    <div className={Styles.header}>
      <Logo name="ABHILASHATANDON.com" />
      <div className={Styles.navbar}>
        <NavLink
          route="/Skills"
          name="Skills"
        />
        <NavLink
          route="/Project"
          name="Project"
        />
        <NavLink
          route="/Blog"
          name="Blog"
        />
        <NavLink
          route="/Contact"
          name="Contact"
        />
        <div className={Styles.button}>
          <NavLink
            route="/Resume"
            name="Resume"
          />
        </div>
      </div>
    </div>
  );
}

function NavLink({ route, name } : {route : string, name : string}) {
  return (
    <Link
      href={route}
      className={Styles.navlink}>
      {name}
    </Link>
  );
}

function Logo({ name } : {name : string}) {
  return (
    <Link
      href={name} //TODO: change this to the top of the page
      id={Styles.logo}>
      {name}
    </Link>
  );
}
