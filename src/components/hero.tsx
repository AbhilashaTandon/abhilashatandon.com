import Styles from "../styles/hero.module.css";
import Avatar from "../../public/avatar.png"
import Image from 'next/image'


export default function Hero() {
    return (
        <div className={Styles.hero}>
            <Intro />
            <Icon />
        </div>
    )
}

function Intro() {
    return (
        <div className={Styles.intro}>
            <h3>Hi There 🙋🏽‍♀️! I’m</h3>
            <h1 style={{ color: "var(--primary-color)" }}>Abhilasha Tandon.</h1>
            <h4>I like making things. Designing things.
                Coding things. Creating things.</h4>
        </div>

    )
}

function Icon() {
    return (
        <div className={Styles.image_container}>
            <Image
                src={Avatar}
                sizes="100vw"
                className={Styles.image}

                alt="Picture of the author" />
        </div>
    )
}