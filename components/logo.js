
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Logo() {
  return (
    <Link href="/" className={styles.logo}>
      Abhilasha Tandon
    </Link>
  );
}
