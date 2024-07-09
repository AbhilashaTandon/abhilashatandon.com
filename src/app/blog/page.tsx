import Navbar from "@/components/navbar";
import Blog from "@/components/blog";

export default function Blogs() {
  return (
    <>
      <Navbar main_page={false} />
      <Blog max_posts={-1}></Blog>
    </>
  );
}
