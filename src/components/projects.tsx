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
  href,
  image_dir,
}: {
  project_name: string;
  href: string;
  image_dir: string;
}): JSX.Element {
  return (
    <div className={Styles.project_tile}>
      <Link href={href + project_name} className={Styles.image_wrapper}>
        <Image
          src={image_dir + project_name + ".png"}
          alt={project_name}
          layout="fill"
          objectFit="cover"
          style={{ maxHeight: "100%" }}
        />
      </Link>
      <h3 className={Styles.projectName}>{capFirst(project_name)}</h3>
    </div>
  );
}

async function ProjectGrid({
  project_data,
}: {
  project_data: { project_name: string }[];
}) {
  const projectTiles = project_data.map(
    (project: { project_name: string }, idx: number) => {
      return (
        <ProjectTile
          key={project.project_name}
          project_name={project.project_name}
          href="/projects/"
          image_dir="/project-icons/"
        />
      );
    }
  );
  return <div className={Styles.grid}>{projectTiles}</div>;
}

export default async function Projects() {
  const allProjects: {
    project_name: string;
  }[] = await getProjects();

  return (
    <div className={Styles.projects} id="projects">
      <h2 className={TextStyles.header}>
        <Link href="/projects">
          <u>My Projects</u>
        </Link>
      </h2>
      <ProjectGrid project_data={allProjects} />
    </div>
  );
}
