import ContentBox from "@/components/content-box";
import testing1 from "../../public/images/testing1.png";
import testing2 from "../../public/images/testing2.png";
import testing3 from "../../public/images/testing3.png";
import testing4 from "../../public/images/testing4.png";
import styles from "@/styles/ContentGrid.module.css";

import { getSortedProjectsData } from "../../lib/projects";

export async function getStaticProps() {
  const projectsData = getSortedProjectsData();
  return {
    props: {
      projectsData,
    },
  };
}

export default function Projects({ projectsData }) {
  return (
    <div>
      <h4>
        This is where you can find various projects I like to work on in my spare time. Topics range from math, software, web development, linguistics, rpgs,
        and just whatever I am interested in at the moment.{" "}
      </h4>
      <div className={styles.grid}>
        {projectsData.map(({ id, date, title, desc }) => (
          <ContentBox
            key={id}
            date={date}
            title={title}
            desc={desc}
            dest={"/projects/" + id}
          />
        ))}
      </div>
    </div>
  );
}
