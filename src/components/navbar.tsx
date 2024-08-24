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
    <p>
      <button onClick={handleClick} className={Styles.toggle}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </p>
  );
}

export default function Navbar({ main_page }: { main_page: boolean }) {
  let logo = (
    <Heading
      route={main_page ? "#hero" : "/"}
      name="ABHILASHATANDON.com"
      type="logo"
    />
  );

  var links = (
    <div className={Styles.links}>
      <Heading route="#projects" name="Projects" type="section" />
      <Heading route="#skills" name="Skills" type="section" />
      <Heading route="#blog" name="Blog" type="section" />
      <Heading route="#contact" name="Contact" type="section" />
      <Heading route="/resume.pdf" name="Resume" type="button" />
      <ThemeSwitch />
    </div>
  );
  if (main_page) {
    return (
      <nav className={Styles.navbar}>
        {logo}
        {links}
      </nav>
    );
  } else {
    return (
      <nav className={Styles.navbar}>
        {logo}
        <ThemeSwitch />
      </nav>
    );
  }
}

function Heading({
  route,
  name,
  type,
}: {
  route: string;
  name: string;
  type: string;
}) {
  if (type === "logo") {
    return (
      <h5>
        <Link className={Styles.logo} href={route}>
          {name}
        </Link>
      </h5>
    );
  } else if (type === "section") {
    return (
      <p>
        <Link className={Styles.section} href={route}>
          {name}
        </Link>
      </p>
    );
  } else if (type === "button") {
    return (
      <p>
        <Link className={Styles.button} href={route}>
          {name}
        </Link>
      </p>
    );
  }
}
