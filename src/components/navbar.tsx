import Link from "next/link";
import Styles from "../styles/navbar.module.css";

export default function Navbar() {
    return (
        <div className={Styles.navbar}>
            <div className={Styles.logo}>
                <Heading route="" name="ABHILASHATANDON.com" />
            </div>
            <div></div>
            <div className={Styles.section}>
                <Heading route="" name="Skills" />
            </div>
            <div className={Styles.section}>
                <Heading route="" name="Projects" />
            </div>
            <div className={Styles.section}>
                <Heading route="" name="Blog" />
            </div>
            <div className={Styles.section}>
                <Heading route="" name="Contact" />
            </div>
            <div className={Styles.button}>
                <Heading route="" name="Resume" />
            </div>
        </div>
    )
}

function Heading({ route, name }: { route: string; name: string }) {
    return (
        <Link href={route}>
            {name}
        </Link>
    )
} 