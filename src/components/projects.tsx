import { promises as fs } from "fs";
import path from "path";
import React from "react";
import Image from "next/image";

import Styles from "../styles/projects.module.css";

const projectsDir: string = "C://Dev//Web Dev//abhilashatandon.com//src//app//projects";

async function getProjects(): Promise<{ project_name: string; image: string }[]> {
  const projectPaths: string[] = await fs.readdir(projectsDir);
  const projects: { project_name: string; image: string }[] = projectPaths.map((project) => {
    const image: string = "/project-icons/icon.png";

    return { project_name: project, image: image };
  });

  return projects;
}

function ProjectTile({ img, project_name, box_style }: { img: string; project_name: string; box_style: string }): JSX.Element {
  return (
    <div className={box_style}>
      <Image
        src={img}
        alt={project_name}
        layout="fill"
        objectFit="cover"
        fill={true}
        style={{ maxHeight: "100%" }}
      />
    </div>
  );
}

async function ProjectGrid({ project_data, parity }: { project_data: { project_name: string; image: string }[]; parity: boolean }) {
  const projectTiles = project_data.map((project: { project_name: string; image: string }, idx: number) => {
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
        img={project.image}
        project_name={project.project_name}
        box_style={style}
      />
    );
  });
  return <div className={Styles.projectGrid}>{projectTiles}</div>;
}

export default async function Projects() {
  const allProjects: {
    project_name: string;
    image: string;
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
    <div className={Styles.projects}>
      <div style={{ display: "flex" }}>
        <ProjectGrid
          project_data={oddProjects}
          parity={false}
        />
        <ProjectGrid
          project_data={evenProjects}
          parity={true}
        />
      </div>
    </div>
  );
}
