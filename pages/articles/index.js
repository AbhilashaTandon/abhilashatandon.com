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
    <div className={styles.grid}>
      {allPostsData.map(({ id, date, title, desc }) => (
        <ContentBox
          key={id}
          date={date}
          title={title}
          desc={desc}
          dest={"/articles/" + id}
        />
      ))}
    </div>
  );
}
