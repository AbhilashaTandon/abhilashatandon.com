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

function NavLink({ route, name }) {
  return (
    <Link
      href={route}
      className={Styles.navlink}>
      {name}
    </Link>
  );
}

function Logo({ name }) {
  return (
    <Link
      href={name} //TODO: change this to the top of the page
      id={Styles.logo}>
      {name}
    </Link>
  );
}

{
  /* <div style="width: 100%; height: 100%; position: relative">
  <div style="width: 345px; height: 29px; left: 0px; top: 0px; position: absolute; text-align: center; color: #EEDEFE; font-size: 27px; font-family: Nunito Sans; font-weight: 800; word-wrap: break-word">
    ABHILASHATANDON.com
  </div>
  <div style="width: 599px; height: 39px; left: 465px; top: 0px; position: absolute">
    <div style="left: 247px; top: 5px; position: absolute; text-align: center; color: #EEDEFE; font-size: 21px; font-family: Nunito Sans; font-weight: 600; word-wrap: break-word">
      Blog
    </div>
    <div style="width: 115px; height: 39px; left: 484px; top: 0px; position: absolute">
      <div style="width: 115px; height: 39px; left: 0px; top: 0px; position: absolute; background: #BF7AFF; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 11px; border: 1px black solid"></div>
      <div style="width: 83px; height: 34px; left: 16px; top: 5px; position: absolute; text-align: center; color: #EEDEFE; font-size: 21px; font-family: Nunito Sans; font-weight: 600; word-wrap: break-word">
        Resume
      </div>
    </div>
    <div style="left: 0px; top: 5px; position: absolute; text-align: center; color: #EEDEFE; font-size: 21px; font-family: Nunito Sans; font-weight: 600; word-wrap: break-word">
      Skills
    </div>
    <div style="left: 111px; top: 5px; position: absolute; text-align: center; color: #EEDEFE; font-size: 21px; font-family: Nunito Sans; font-weight: 600; word-wrap: break-word">
      Projects
    </div>
    <div style="left: 351px; top: 5px; position: absolute; text-align: center; color: #EEDEFE; font-size: 21px; font-family: Nunito Sans; font-weight: 600; word-wrap: break-word">
      Contact
    </div>
  </div>
</div>; */
}
