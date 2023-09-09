import ContentBox from "@/components/content-box";
import styles from "@/styles/ContentGrid.module.css";
import General from "@/styles/General.module.css";

import { getSortedPostsData } from "../../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Articles({ allPostsData }) {
  return (
    <>
      <h1 className={General.large_text}>This is my blog!</h1>
      <div className={styles.grid}>
        {allPostsData.map(({ id, date, title, image }) => (
          <ContentBox key={id} title={title} desc={date} dest={"/articles/" + id} />
        ))}
      </div>
    </>
  );
}
