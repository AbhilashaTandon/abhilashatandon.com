import Navbar from "@/components/navbar";

import Markdown from "markdown-to-jsx";

import Styles from "@/styles/blog_post.module.css";
import Link from "next/link";

import { getBlogPost } from "@/components/blog";

export default async function Page({ params }: { params: { slug: string } }) {
  const post_data = await getBlogPost(params.slug + ".md");

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

  const body = <Markdown className="p">{post_data.text}</Markdown>;

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
          <div className={Styles.header}>
            <h1 className="h1">{post_data.frontmatter["title"]}</h1>
            <h2 className="h4">{post_data.frontmatter["description"]}</h2>
            <h3 className="h4">{formatted_date}</h3>
            <div className={Styles.tag_list}>{tags}</div>
            <h3 className="h5">{back_to_blog}</h3>
            <hr></hr>
          </div>
          <div className={Styles.body}>{body}</div>
          <div className={Styles.footer}>
            <hr></hr>
            <h3 className="h5">{back_to_blog}</h3>
          </div>
        </div>
      </main>
    </>
  );
}
