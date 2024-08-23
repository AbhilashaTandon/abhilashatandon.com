import Styles from "../styles/hero.module.css";
import Avatar from "../../public/avatar.png";
import Image from "next/legacy/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className={Styles.hero} id="hero">
      <Intro />
      <Icon />
    </div>
  );
}

function Intro() {
  return (
    <div className={Styles.intro}>
      <h2>Hi There 🙋🏽‍♀️! I’m</h2>
      <h1 style={{ color: "var(--accent-color)" }}>Abhilasha Tandon.</h1>
      <h3>
        I like making things. Designing things. Coding things. Creating things.
      </h3>

      <button className={Styles.button}>
        <Link href="#projects">
          <h3>Check Them Out!</h3>
        </Link>
      </button>
    </div>
  );
}

function Icon() {
  return (
    <div className={Styles.image_container}>
      <Image
        rel="preload" //loads faster
        fetchPriority="high"
        src={Avatar}
        className={Styles.image}
        layout="fill"
        alt="Picture of the author"
        aria-label="Picture of the author"
      />
    </div>
  );
}
