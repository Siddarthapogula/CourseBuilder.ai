"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderClient() {
  const pathname = usePathname();
  const { data } = useSession();

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
        href="/"
        onClick={handleScrollFeatures}
        className="nav-item-underline-animation"
      >
        Features
      </Link>
      <Link
        href="/"
        onClick={handleScroll}
        className="nav-item-underline-animation"
      >
        How it Works?
      </Link>
      <Link href="/course/all" className="nav-item-underline-animation">
        All Courses
      </Link>
      {data?.user && (
        <Link href="/course/me" className="nav-item-underline-animation">
          My Courses
        </Link>
      )}
      <Link href="/pricing" className="nav-item-underline-animation">
        Pricing
      </Link>
    </ul>
  );
}
