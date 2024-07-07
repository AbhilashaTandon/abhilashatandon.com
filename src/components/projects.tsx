import { promises as fs } from "fs";
import path from "path";
import React from "react";
import Image from "next/legacy/image";

import Styles from "../styles/projects.module.css";
import Link from "next/link";

import TextStyles from "../styles/text.module.css";

const projectsDir: string = path.join(process.cwd(), "src/app/projects");

async function getProjects(): Promise<
  { project_name: string; image: string }[]
> {
  const projectPaths: string[] = (
    await fs.readdir(projectsDir, { withFileTypes: true })
  )
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const projects: { project_name: string; image: string }[] = projectPaths.map(
    (project) => {
      const image: string = "/../../public/project_icons/" + project + ".png";

      return { project_name: project, image: image };
    }
  );

  return projects;
}

function capFirst(str: string) {
  str = str.replaceAll("-", " ");
  return str.split(" ").map((word) => {
    return word[0].toUpperCase() + word.substring(1) + " ";
  });
}

function ProjectTile({
  project_name,
  box_style,
}: {
  project_name: string;
  box_style: string;
}): JSX.Element {
  return (
    <Link href={"/projects/" + project_name}>
      <div className={box_style}>
        <Image
          src={require("./../../public/project-icons/" + project_name + ".png")}
          alt={project_name}
          layout="fill"
          objectFit="cover"
          style={{ maxHeight: "100%" }}
        />
        <h1 className={Styles.projectName}>{capFirst(project_name)}</h1>
      </div>
    </Link>
  );
}

//makes a nice fancy asymmetric grid
async function ProjectGrid({
  project_data,
  parity,
}: {
  project_data: { project_name: string }[];
  parity: boolean;
}) {
  const projectTiles = project_data.map(
    (project: { project_name: string }, idx: number) => {
      var style: string = "";
      switch (idx % 4) {
        case 0:
          style = parity ? Styles.bigBox : Styles.smallBox;
          break;
        case 1:
          style = parity ? Styles.smallBox : Styles.bigBox;
          break;
        case 2:
          style = parity ? Styles.smallBox : Styles.bigBox;
          break;
        case 3:
          style = parity ? Styles.bigBox : Styles.smallBox;
          break;
      }
      return (
        <ProjectTile
          key={project.project_name}
          project_name={project.project_name}
          box_style={style}
        />
      );
    }
  );
  return <div className={Styles.projectGrid}>{projectTiles}</div>;
}

export default async function Projects() {
  const allProjects: {
    project_name: string;
  }[] = await getProjects();
  const oddProjects = [];
  const evenProjects = [];
  for (var i = 0; i < allProjects.length; i++) {
    if (i % 2 == 0) {
      evenProjects.push(allProjects[i]);
    } else {
      oddProjects.push(allProjects[i]);
    }
  }
  return (
    <div className={Styles.projects} id="projects">
      <h2
        className={TextStyles.section_header}
        style={{ color: "var(--text-color)" }}
      >
        <Link href="/projects">My Projects</Link>
      </h2>
      <div className={Styles.project_grids}>
        <ProjectGrid project_data={oddProjects} parity={false} />
        <ProjectGrid project_data={evenProjects} parity={true} />
      </div>
    </div>
  );
}
