import Link from "next/link";
import styles from "@/styles/Navbar.module.css";

export default function Logo() {
  return (
    <h4>
      <Link href="/" className={styles.logo}>
        ABHILASHATANDON.com
      </Link>
    </h4>
  );
}
