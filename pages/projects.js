import ContentBox from "@/components/content-box";
import testing1 from "../public/images/testing1.png"
import testing2 from "../public/images/testing2.png"
import testing3 from "../public/images/testing3.png"
import testing4 from "../public/images/testing4.png"
import styles from "@/styles/ContentGrid.module.css";

export default function Projects() {
  return (
    <>
      <h2>These are my projects!</h2>
      <div className={styles.grid}>
        <ContentBox
          image={testing1}
          title="Testing #1"
          desc="this is #1"
          dest="/"
        />
        <ContentBox
          image={testing2}
          title="Testing #1"
          desc="this is #1"
          dest="/"
        />
      </div>
    </>
  );
}
