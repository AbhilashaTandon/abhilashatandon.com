import Styles from "../styles/blog.module.css"
import Image, { StaticImageData } from "next/legacy/image";
import SWE from "../../public/software-dev.png";
import Web from "../../public/web-dev.png";
import ML from "../../public/ml.png";
import React from "react";
import TextStyles from "../styles/text.module.css"
import fs from "fs";

import path from "path";
import matter from "gray-matter";

const blogFolder = process.cwd() + "/src/app/blog"

export const getFileContent = (filename: string) => {
  return fs.readFileSync(path.join(blogFolder, filename), "utf8");
};

async function getBlogPosts() {
  var all_files = fs.readdirSync(blogFolder)
  var markdown = all_files.filter((path) => /\\.md?$/.test(path));

  return markdown.map((file_path) => {
    const blog_post = getFileContent(file_path); // retrieve the file contents
    const slug = file_path.replace(/\\.md?$/, ""); // get the slug from the filename
    const { data } = matter(blog_post); // extract frontmatter
    return {
      frontmatter: data,
      slug: slug,
    };
  });
}

function BlogPostTile({ title, body, symbol }: { title: string; body: string; symbol: StaticImageData }) {
  return (
    <div className={Styles.tile} id="blog">
      <p
        className={Styles.section}
        style={{ textAlign: "center", color: "var(--secondary-color)" }}>
        {title}
      </p>
      <h5 style={{ textAlign: "center", color: "var(--secondary-color)" }}>{body}</h5>
    </div>
  );
}

export default function Blog() {
  console.log(getBlogPosts())
  return (
    <div id="Blog" className={Styles.blog}>
      <h2
        className={TextStyles.section_header}
        style={{ color: "var(--text-color)", marginLeft: "var(--left-content-margin)" }}>
        My Blog
      </h2>
      <div className={Styles.tiles}>
        <BlogPostTile
          title="Software Development "
          body="Seasoned in the software development lifecycle, I excel in writing  clean, maintainable code using Java, Python, and C++. I also am familiar with C#."
          symbol={SWE}
        />
        <BlogPostTile
          title="Web Development"
          body="I create visually appealing, functional websites, focusing on elegant and simple design using Javascript, HTML, CSS, React.js, and Next.js"
          symbol={Web}
        />
        <BlogPostTile
          title="Machine Learning"
          body="Grounded in a strong mathematical foundation, I innovate AI models for, natural language  processing, predictive models, and computer vision, with experience in PyTorch and Tensorflow."
          symbol={ML}
        />
      </div>
    </div>
  );
}
