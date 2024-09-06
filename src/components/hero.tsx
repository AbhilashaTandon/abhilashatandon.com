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
      <h1 className="h2">Hi There 🙋🏽‍♀️! I’m</h1>
      <h2 className="h1" style={{ color: "var(--accent-color)" }}>
        Abhilasha Tandon.
      </h2>
      <h3 className="h3">
        I like making things. Designing things. Coding things. Creating things.
      </h3>

      {/* <button className={Styles.button}> */}
      <Link href="#projects" className="button">
        <h4 className="h4">Check Them Out!</h4>
      </Link>
      {/* </button> */}
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
