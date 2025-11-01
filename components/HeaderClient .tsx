"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderClient() {
  const pathname = usePathname();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (pathname === "/") {
      e.preventDefault();
      const section = document.getElementById("how-it-works");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleScrollFeatures = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (pathname === "/") {
      e.preventDefault();
      const section = document.getElementById("features");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ul className="hidden md:flex gap-8">
      <Link
        href="/#features"
        onClick={handleScrollFeatures}
        className="hover:underline"
      >
        Features
      </Link>
      <Link
        href="/#how-it-works"
        onClick={handleScroll}
        className="hover:underline"
      >
        How it Works?
      </Link>
      <Link href="/course/all" className="hover:underline">
        All Courses
      </Link>
    </ul>
  );
}
