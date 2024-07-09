import Styles from "../styles/blog.module.css";
import Image, { StaticImageData } from "next/legacy/image";
import SWE from "../../public/software-dev.png";
import Web from "../../public/web-dev.png";
import ML from "../../public/ml.png";
import React from "react";
import TextStyles from "../styles/text.module.css";
import fs from "fs";

import path from "path";
import matter from "gray-matter";

var log_file = fs.createWriteStream(
  path.join(process.cwd(), "src/app/log.txt"),
  {
    flags: "w",
  }
);

const blogFolder = path.join(process.cwd(), "src/app/blog");

export const getFileContent = (filename: string) => {
  return fs.readFileSync(path.join(blogFolder, filename), "utf8");
};

async function getBlogPosts(): Promise<
  { frontmatter: { [key: string]: any }; slug: string }[]
> {
  var all_files = fs.readdirSync(blogFolder);

  var markdown = all_files.filter((path) => /\.md?$/.test(path));
  log_file.write(markdown.join(", "));

  return markdown.map((file_path) => {
    const blog_post = getFileContent(file_path); // retrieve the file contents
    const slug = file_path.replace(/\.md?$/, ""); // get the slug from the filename
    const { data } = matter(blog_post); // extract frontmatter
    return {
      frontmatter: data,
      slug: slug,
    };
  });
}

function BlogPostTile({ title, body }: { title: string; body: string }) {
  return (
    <div className={Styles.tile} id="blog">
      <p
        className={Styles.section}
        style={{ textAlign: "center", color: "var(--secondary-color)" }}
      >
        {title}
      </p>
      <h5 style={{ textAlign: "center", color: "var(--secondary-color)" }}>
        {body}
      </h5>
    </div>
  );
}

export default async function Blog() {
  const blog_posts = await getBlogPosts();

  const published_posts = blog_posts.filter(
    (post) => post.frontmatter["isPublished"]
  );

  const blogTiles = published_posts.map(
    (post: { frontmatter: { [key: string]: any }; slug: string }) => {
      return (
        <BlogPostTile
          key={post.slug}
          title={post.frontmatter["title"]}
          body={post.frontmatter["description"]}
        />
      );
    }
  );

  return (
    <div id="Blog" className={Styles.blog}>
      <h2
        className={TextStyles.section_header}
        style={{
          color: "var(--text-color)",
          marginLeft: "var(--left-content-margin)",
        }}
      >
        My Blog
      </h2>
      <div className={Styles.tiles}>{blogTiles}</div>
    </div>
  );
}
