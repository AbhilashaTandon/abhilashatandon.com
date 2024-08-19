import Navbar from "@/components/navbar";
import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import React from "react";
import Image from "next/legacy/image";

import Styles from "@/styles/projects.module.css";
import CustomStyles from "@/styles/computer-graphics.module.css";

export default function Page() {
  return (
    <main>
      <Intro></Intro>
    </main>
  );
}

const projectsDir: string = path.join(
  process.cwd(),
  "public/computer-graphics-files"
);

async function getProjects(): Promise<
  { project_name: string; image: string }[]
> {
  const projectPaths: string[] = (
    await fs.readdir(projectsDir, { withFileTypes: true })
  )
    .filter((dirent) => !dirent.isDirectory())
    .map((dirent) => dirent.name);

  const projects: { project_name: string; image: string }[] = projectPaths.map(
    (project) => {
      const image: string =
        "/../../public/project_icons/computer-graphics" + project + ".png";

      return { project_name: project, image: image };
    }
  );

  return projects;
}

function formatFileName(str: string) {
  str = str.replaceAll("-", " ");
  str = str
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1) + " ";
    })
    .join(" "); //capitalize each word
  str = str.split(".")[0];

  return str;
}

function ProjectTile({ project_name }: { project_name: string }): JSX.Element {
  return (
    <div className={Styles.box}>
      <Link href={"/projects/computer-graphics/" + project_name}>
        <Image
          src={"/project-icons/computer-graphics/" + project_name + ".png"}
          alt={project_name}
          layout="fill"
          objectFit="cover"
        />
        <h1 className={Styles.projectName}>{formatFileName(project_name)}</h1>
      </Link>
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
        />
      );
    }
  );
  return <div className={Styles.grid}>{projectTiles}</div>;
}

async function Intro() {
  const allProjects: {
    project_name: string;
  }[] = await getProjects();

  return (
    <div className={Styles.projects}>
      <h2 className={CustomStyles.intro}>
        In the Fall of 2023, I had the privilege of enrolling in the Special
        Topics: Computer Graphics course at NYU, under the esteemed guidance of
        graphics pioneer Ken Perlin. This course became the highlight of my
        academic journey. We delved into the fundamentals of computer graphics
        through WebGL. This page provides a directory of the projects I
        developed for this class, each demonstrating various principles of
        computer graphics. Please note that compatibility may vary across
        different browsers and systems.
      </h2>
      <ProjectGrid project_data={allProjects} />
    </div>
  );
}
