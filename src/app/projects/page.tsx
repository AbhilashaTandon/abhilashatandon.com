import Projects from "@/components/projects";
import Navbar from "@/components/navbar";

import Link from "next/link";

export default function Page() {
  return (
    <>
      <Navbar main_page={false} />
      <main>
        <Projects />
      </main>
    </>
  );
}

function Heading({ route, name }: { route: string; name: string }) {
  return <Link href={route}>{name}</Link>;
}
