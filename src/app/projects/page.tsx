import Projects from "@/components/projects";

import Link from "next/link";

export default function Page() {
  return (
    <main>
      <Projects />
    </main>
  );
}

function Heading({ route, name }: { route: string; name: string }) {
  return <Link href={route}>{name}</Link>;
}
