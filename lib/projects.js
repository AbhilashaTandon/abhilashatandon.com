import fs from "fs";
import path from "path";
import matter from "gray-matter";
// import { remark } from "remark";
// import html from "remark-html";

const projectsDirectory = path.join(process.cwd(), "pages/projects");

export function getSortedProjectsData() {
  // Get file names under /projects
  const fileNames = fs.readdirSync(projectsDirectory, { withFileTypes: false, recursive: false }).filter((item) => item !== "index.js");
  //assume all projects are in folders. ignore "index.js"
  console.log(fileNames);

  const projectsData = fileNames.map((fileName) => {
    // Read markdown file as string
    const fullPath = path.join(projectsDirectory, fileName + "/index.js");

    const id = fileName;

    const fileContents = fs.readFileSync(fullPath, "utf8");

    const regex = new RegExp("---[\\s\\S]*---", "gm"); //matches comments
    console.log(regex);

    const header = fileContents.match(regex);

    console.log(header);

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(header[0]);

    console.log(matterResult);

    return {
      id,
      ...matterResult.data,
    };
  });

  /*
  const allProjectsData = fileNames.map((fileName) => {
    // Read markdown file as string
    const fullPath = path.join(projectsDirectory, fileName);

    const id = fullPath.split('/').reverse()[1]; //folder that index.js is in

    const fileContents = fs.readFileSync(fullPath, "utf8");

    const header = fileContents.match("/\\/\\*(.|\\s)*\\*\\//gim")

    console.log(header);

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  */

  // Sort projects by date
  return projectsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
