import Image from "next/image";
import Avatar from "../../public/avatar.png";
import Styles from "../styles/hero.module.css";
import React from "react";

export default function Hero() {
  return (
    <div className={Styles.hero} id="hero">
      <div className={Styles.content}>
        <h3>Hi There 🙋🏽‍♀️! I&apos;m</h3>
        <h1 className={Styles.name}> Abhilasha Tandon</h1>
        {/* i keep this a bit to the left since the text is bigger, it looks like it lines up with the rest of the text even though it doesnt */}
        <h2>I like making things. Designing things. Coding things. Optimizing things.</h2>
        
      </div>
      <div className={Styles.image}>
        <Image
          src={Avatar}
          alt="error"
        />
      </div>
    </div>
  );
}
