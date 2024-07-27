import fs from "fs";

import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";

import Styles from "@/styles/blog_post.module.css";
import Link from "next/link";

import { getFileContent } from "@/components/blog";

const blogFolder = path.join(process.cwd(), "src/app/blog/posts");

async function getBlogPost(
  slug: string
): Promise<{ frontmatter: { [key: string]: any }; text: string }> {
  var all_files = fs.readdirSync(blogFolder); //gets all files in posts directory

  var markdown = all_files.filter((path) => /\.md?$/.test(path)); //gets only markdown files

  var requested_post = all_files.filter((file_path) => {
    const current_slug = file_path.replace(/\.md?$/, ""); // get the slug from the filename)
    return slug === current_slug;
  }); //filters by posts that share requested filename

  if (requested_post.length == 0) {
    notFound(); //if none in list then throw error
  }

  const blog_post = getFileContent(requested_post[0]); // retrieve the file contents
  const { data, content } = matter(blog_post); // extract frontmatter
  return {
    frontmatter: data,
    text: content,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post_data = await getBlogPost(params.slug);

  const published_date = new Date(post_data.frontmatter["publishedDate"]);
  const formatted_date = published_date.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const tags: string = post_data.frontmatter["tags"].map((tag: string) => (
    <h4 className={Styles.tag} key={tag}>
      {tag}
    </h4>
  ));

  const body: JSX.Element[] = post_data.text
    .split("---")
    .map((paragraph: string) => <h5 key={paragraph}>{paragraph}</h5>);

  const back_to_blog: JSX.Element = (
    <div className={Styles.back_to_blog}>
      <Link href="/blog">
        <h4>
          <b>
            &lt;&mdash; <u>Back to Blog </u>
          </b>
        </h4>
      </Link>
    </div>
  );

  return (
    <>
      <Navbar main_page={false} />
      <main>
        <div className={Styles.blog_post}>
          <h1>{post_data.frontmatter["title"]}</h1>
          <h2>{post_data.frontmatter["description"]}</h2>
          <h3>{formatted_date}</h3>
          <div className={Styles.tag_list}>{tags}</div>
          {back_to_blog}
          <hr></hr>
          {body}
          {back_to_blog}
        </div>
      </main>
    </>
  );
}
