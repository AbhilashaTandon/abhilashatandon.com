import { getAllPostIds, getPostData } from "../../lib/posts";
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
      <h1>{postData.title}</h1>
      <h3>
        <Date dateString={postData.date} />
      </h3>
      <hr></hr>
      <h4 dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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
