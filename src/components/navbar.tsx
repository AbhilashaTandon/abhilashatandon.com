"use client";

import Link from "next/link";
import Styles from "../styles/navbar.module.css";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/lightDarkMode";

function ThemeSwitch() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const handleClick = () => {
    toggleTheme();
  };
  return (
    <p className="h5">
      <button onClick={handleClick} className="button">
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </p>
  );
}

export default function Navbar({ main_page }: { main_page: boolean }) {
  let logo = (
    <Logo route={main_page ? "#hero" : "/"} name="ABHILASHATANDON.com" />
  );

  var links = (
    <div className={Styles.links}>
      <Section route="#projects" name="Projects" />
      <Section route="#skills" name="Skills" />
      <Section route="#blog" name="Blog" />
      <Section route="#contact" name="Contact" />
    </div>
  );
  if (main_page) {
    var buttons = (
      <>
        <Resume route="/resume.pdf" name="My Resume" />
        <ThemeSwitch />
      </>
    );
  } else {
    var buttons = <ThemeSwitch />;
  }

  if (main_page) {
    return (
      <nav className={Styles.navbar}>
        <div className={Styles.left_navbar}>
          {logo}
          {links}
        </div>
        <div className={Styles.right_navbar}>{buttons}</div>
      </nav>
    );
  } else {
    return (
      <nav className={Styles.navbar}>
        <div>{logo}</div>
        <div>{buttons}</div>
      </nav>
    );
  }
}

function Logo({ route, name }: { route: string; name: string }) {
  return (
    <h4 className="h5">
      <Link className="a" href={route}>
        <b>{name}</b>
      </Link>
    </h4>
  );
}

function Section({ route, name }: { route: string; name: string }) {
  return (
    <p className="h5">
      <Link className="a" href={route}>
        {name}
      </Link>
    </p>
  );
}

function Resume({ route, name }: { route: string; name: string }) {
  return (
    <p className="h5">
      <button className="button">
        <Link href={route}>{name}</Link>
      </button>
    </p>
  );
}
