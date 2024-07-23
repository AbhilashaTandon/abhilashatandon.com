import fs from "fs";

import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";

import { getFileContent } from "@/components/blog";

const blogFolder = path.join(process.cwd(), "src/app/blog/posts");

async function getBlogPost(
  slug: string
): Promise<{ frontmatter: { [key: string]: any } }> {
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
  const { data } = matter(blog_post); // extract frontmatter
  return {
    frontmatter: data,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  var post_data = await getBlogPost(params.slug);

  return (
    <>
      <Navbar main_page={false} />
      <main>
        <h1>{post_data.frontmatter["title"]}</h1>
        {post_data.frontmatter["description"]}
      </main>
    </>
  );
}
