import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <center>
        <h1>Project Not Found</h1>
        <h5>Couldn&apos;t find Project</h5>
        <Link href="/">
          <h2>Return Home</h2>
        </Link>
        <p></p>
        <Link href="/projects">
          <h2>Return To Project</h2>
        </Link>
      </center>
    </div>
  );
}
