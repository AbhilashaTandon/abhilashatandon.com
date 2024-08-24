import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";

import { notFound } from "next/navigation";
import { get } from "http";
import { createElement } from "react";

import Styles from "./computer_graphics.module.css";

const projectsDir: string = path.join(
  process.cwd(),
  "public/computer-graphics-files"
);

async function getProject(project_name: string): Promise<string> {
  const projectPaths: string[] = (
    await fs.readdir(projectsDir, { withFileTypes: true })
  )
    .filter((dirent) => !dirent.isDirectory())
    .filter((dirent) => dirent.name === project_name + ".html")
    .map((dirent) => dirent.name);

  if (projectPaths.length === 0) {
    notFound();
  }

  console.log(projectPaths[0]);

  const project_html = fs.readFile(projectsDir + "\\" + projectPaths[0], {
    encoding: "utf-8",
  });

  return project_html;
}

export default async function Page({
  params,
}: {
  params: { project_name: string };
}) {
  const project = await getProject(params.project_name);

  console.log(project);

  const html_template = { __html: project };

  return (
    <main
      className={Styles.container}
      dangerouslySetInnerHTML={html_template}
    />
  ); //this is bad practice but I don't want to rewrite my files in react
}
