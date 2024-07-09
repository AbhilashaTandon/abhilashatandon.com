import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <center>
        <h1>Blog Post Not Found</h1>
        <h5>Couldn&apos;t find Blog Post</h5>
        <Link href="/">
          <h2>Return Home</h2>
        </Link>
        <p></p>
        <Link href="/blog">
          <h2>Return To Blog Posts</h2>
        </Link>
      </center>
    </div>
  );
}
