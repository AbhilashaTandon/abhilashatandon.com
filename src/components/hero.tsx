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
      <h1 className="h4">Hello there. My name is </h1>
      <h1 className="h1" style={{ color: "var(--accent-color)" }}>
        Abhilasha Tandon.
      </h1>
      <h2 className="h4">
        I&apos;m a backend developer who loves Python, Rust, and finding
        insights in data. Here you can find my projects, my skillset, and my
        blog.
      </h2>

      <Link href="#projects" className="button">
        <h3 className="h4">Check Them Out!</h3>
      </Link>
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
