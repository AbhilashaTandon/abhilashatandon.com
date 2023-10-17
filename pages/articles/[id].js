import { getAllPostIds, getPostData } from "../../lib/posts";
import General from "@/styles/General.module.css";
import Date from "@/components/date";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Article({ postData }) {
  return (
    <>
      <h1 className={General.large_text}>{postData.title}</h1>
      <h3 className={General.medium_text}>
        <Date dateString={postData.date} />
      </h3>
      <hr></hr>
      <div
        className={General.small_text}
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </>
  );
}

export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}
