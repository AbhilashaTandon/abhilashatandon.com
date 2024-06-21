import Styles from "../styles/blog.module.css"
import Image, { StaticImageData } from "next/image";
import SWE from "../../public/software-dev.png";
import Web from "../../public/web-dev.png";
import ML from "../../public/ml.png";
import React from "react";
import TextStyles from "../styles/text.module.css"
import { promises as fs } from "fs";

// const blogsDir: string = "..//abhilashatandon.com//src//app//blogs";

// async function getblogs(): Promise<{ blog_name: string; image: string }[]> {
//   const blogPaths: string[] = await fs.readdir(blogsDir);
//   const blogs: { blog_name: string; image: string }[] = blogPaths.map((blog) => {
//     const image: string = "/../../public/blog_icons/" + blog + ".png";

//     return { blog_name: blog, image: image };
//   });

//   return blogs;
// }

function BlogPostTile({ title, body, symbol }: { title: string; body: string; symbol: StaticImageData }) {
  return (
    <div className={Styles.tile}>
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
