import Image from "next/image";
import styles from "@/styles/page.module.css";

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <main className={styles.main}>
        <Hero />
      </main>
    </>
  );
}

{
  /* attribution links

<a
  href="https://www.flaticon.com/free-icons/software-development"
  title="software development icons">
  Software development icons created by Witdhawaty - Flaticon
</a>; 
<a href="https://www.flaticon.com/free-icons/data" title="data icons">Data icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/neural-network" title="neural network icons">Neural network icons created by Freepik - Flaticon</a>
*/
}
