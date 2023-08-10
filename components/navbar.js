import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <ul>
        <li>
          <Link href="/projects">Projects</Link>
        </li>
        <li>
          <Link href="/articles">Articles</Link>
        </li>
        <li>
            <Link href="/resume">Resume</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </>
  );
}
