import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import React from "react";
import Image from "next/image";

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
      <h1 className={Styles.projectName}>{capFirst(project_name)}</h1>
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
      let project_name: string = project.project_name.replace(".html", "");
      return (
        <ProjectTile
          key={project_name}
          project_name={project_name}
          href="/projects/computer-graphics/"
          image_dir="/project-icons/computer-graphics/"
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
        In the fall of 2023, I had the privilege of enrolling in the Special
        Topics: Computer Graphics course at NYU under the esteemed guidance of
        graphics pioneer&nbsp;
        <span>
          <Link href={"https://cs.nyu.edu/~perlin/"}>Ken Perlin</Link>
        </span>
        . This course became the highlight of my academic journey. We delved
        into the fundamentals of computer graphics through WebGL. This page
        provides a directory of the projects I developed for this class, each
        demonstrating various principles of computer graphics. Please note that
        compatibility may vary across different browsers and systems.
      </h2>
      <ProjectGrid project_data={allProjects} />
    </div>
  );
}
