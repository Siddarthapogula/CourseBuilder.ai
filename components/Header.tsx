"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Layers, User } from "lucide-react";
import HeaderClient from "./HeaderClient ";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Header() {
  const session: any = useSession();
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
  let data;
  if (session) {
    data = session.data;
  }
  return (
    <header
      className=" fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 
     supports-backdrop-filter:bg-background/60 "
    >
      <nav className=" flex justify-around py-4 items-center">
        <Link href="/" className="flex items-center gap-2">
          <Layers className="h-5 w-5" />
          <span className="text-lg font-medium">CourseBuilder AI</span>
        </Link>
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
          <Link href="/courses/me" className="hover:underline">
            My Courses
          </Link>
        </ul>
        <div className=" flex gap-6">
          {session.status === "authenticated" ? (
            <div className=" flex gap-3 items-center">
              <Link href={`/profile`}>
                {data.user.image ? (
                  <Image
                    width={35}
                    height={35}
                    className=" rounded-full"
                    alt=""
                    src={data.user.image}
                  />
                ) : (
                  <User className=" w-6 h-6" />
                )}
              </Link>
              <Button onClick={() => signOut()}>Logout</Button>
            </div>
          ) : (
            <div className=" flex gap-3">
              <Link href="/sign-up">
                <Button variant={"outline"}>Sign Up</Button>
              </Link>
              <Link href={"/sign-in"}>
                <Button>Sign In</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
