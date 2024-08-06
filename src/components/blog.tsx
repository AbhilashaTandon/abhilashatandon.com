import Styles from "../styles/blog.module.css";
import Image, { StaticImageData } from "next/legacy/image";
import SWE from "../../public/software-dev.png";
import Web from "../../public/web-dev.png";
import ML from "../../public/ml.png";
import React from "react";
import TextStyles from "../styles/text.module.css";
import fs from "fs";
import Link from "next/link";

import path from "path";
import matter from "gray-matter";

const blogFolder = path.join(process.cwd(), "src/app/blog/posts");

export const getFileContent = (filename: string) => {
  return fs.readFileSync(path.join(blogFolder, filename), "utf8");
};

async function getBlogPosts(): Promise<
  { frontmatter: { [key: string]: any }; slug: string }[]
> {
  var all_files = fs.readdirSync(blogFolder);

  var markdown = all_files.filter((path) => /\.md?$/.test(path));

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

function BlogPostTile({
  title,
  body,
  slug,
}: {
  title: string;
  body: string;
  slug: string;
}) {
  return (
    <a href={"/blog/" + slug} className={Styles.tile} id="blog">
      <h3 className={Styles.section}>{title}</h3>
      <h4>{body}</h4>
    </a>
  );
}

export default async function Blog({ max_posts }: { max_posts: number }) {
  const blog_posts = await getBlogPosts();

  const published_posts = blog_posts.filter(
    (post) => post.frontmatter["isPublished"]
  );

  published_posts.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return (
      Date.parse(b.frontmatter["publishedDate"]) -
      Date.parse(a.frontmatter["publishedDate"])
    );
  });

  var blogTiles;
  if (max_posts < 0) {
    //for when not displayed on front page
    blogTiles = published_posts.map(
      (post: { frontmatter: { [key: string]: any }; slug: string }) => {
        return (
          <BlogPostTile
            key={post.slug}
            title={post.frontmatter["title"]}
            body={post.frontmatter["description"]}
            slug={post.slug}
          />
        );
      }
    );

    return (
      <div id="Blog" className={Styles.blog_full}>
        <h4 className={Styles.section_header}>Blog Posts</h4>
        <div className={Styles.tiles}>{blogTiles}</div>
      </div>
    );
  } else {
    //for when on front page
    blogTiles = published_posts
      .slice(0, max_posts)
      .map((post: { frontmatter: { [key: string]: any }; slug: string }) => {
        return (
          <BlogPostTile
            key={post.slug}
            title={post.frontmatter["title"]}
            body={post.frontmatter["description"]}
            slug={post.slug}
          />
        );
      });

    return (
      <div id="Blog" className={Styles.blog}>
        <Link href="/blog">
          <h2>My Blog</h2>
        </Link>
        <div className={Styles.tiles}>{blogTiles}</div>
      </div>
    );
  }
}
