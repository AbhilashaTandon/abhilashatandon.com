import { getAllPostIds, getPostData } from "../../lib/posts";
import General from "@/styles/General.module.css";

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
      <h3 className={General.medium_text}>{postData.id}</h3>
      <h3 className={General.medium_text}>{postData.date}</h3>
    </>
  );
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
