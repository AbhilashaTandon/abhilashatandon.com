import Styles from "../styles/blog.module.css";
import React from "react";
import TextStyles from "../styles/text.module.css";
import fs from "fs";
import Link from "next/link";

import path from "path";
import matter from "gray-matter";

const blogFolder = path.join(process.cwd(), "src/app/blog/posts");

const getFileContent = (file_name: string) => {
  return fs.readFileSync(path.join(blogFolder, file_name), "utf8");
};

export function getBlogPost(file_name: string): {
  frontmatter: { [key: string]: any };
  text: string;
  slug: string;
} {
  const blog_post = getFileContent(file_name); // retrieve the file contents
  const slug = path.basename(file_name).replace(/\.md?$/, "");
  const { data, content } = matter(blog_post); // extract frontmatter
  return {
    frontmatter: data,
    text: content,
    slug: slug,
  };
}

function getAllBlogPosts(): {
  frontmatter: { [key: string]: any };
  text: string;
  slug: string;
}[] {
  const all_files: string[] = fs.readdirSync(blogFolder);
  const markdown: string[] = all_files.filter((path) => /\.md?$/.test(path));
  //checks if files end in .md

  const blog_posts = markdown.map((file_name) => {
    return getBlogPost(file_name);
  });

  return blog_posts;
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
      <h2 className={Styles.section + " h2"}>{title}</h2>
      <h3 className="h4">{body}</h3>
    </a>
  );
}

export default async function Blog({ max_posts }: { max_posts: number }) {
  const blog_posts = await getAllBlogPosts();

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
      (post: {
        frontmatter: { [key: string]: any };
        text: string;
        slug: string;
      }) => {
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
      <>
        <div id="Blog" className={Styles.blog}>
          <h2 className={TextStyles.header + " h2"}>Blog Posts</h2>
          <div className={Styles.tiles}>{blogTiles}</div>

          <h3 className="h3">
            <u>
              <Link href="/">Back to Home</Link>
            </u>
          </h3>
        </div>
      </>
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
        <h2 className={TextStyles.header + " h2 a"}>
          <u>
            <Link href="/blog">My Blog</Link>
          </u>
        </h2>

        <div className={Styles.tiles}>{blogTiles}</div>
      </div>
    );
  }
}
